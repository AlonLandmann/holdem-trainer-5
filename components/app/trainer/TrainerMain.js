import { useEffect, useState } from 'react'
import Toolbar from './Toolbar'
import { useRouter } from 'next/router'
import { isEqual, random, sample } from 'lodash'
import { rng } from '@/lib/shared/rounding'
import { sampleHoleCards } from '@/lib/shared/cards'
import History from './History'
import Table from './Table'
import RandomNumber from './RandomNumber'
import AnswerButtons from './AnswerButtons'
import Stats from './Stats'
import Sidebar from './Sidebar'
import { v4 as uuid } from 'uuid'
import toast from 'react-hot-toast'

export default function TrainerMain({ user }) {
  const [sidebarInView, setSidebarInView] = useState(true)
  const [statsInView, setStatsInView] = useState(true)
  const router = useRouter()
  const [ranges, setRanges] = useState(null)
  const [range, setRange] = useState(null)
  const [spot, setSpot] = useState(null)
  const [holeCards, setHoleCards] = useState(null)
  const [randomNumber, setRandomNumber] = useState(null)
  const [flash, setFlash] = useState(null)
  const [timer, setTimer] = useState(null)
  const [stats, setStats] = useState([])
  const [wasWrong, setWasWrong] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [count, setCount] = useState(0)
  const [batch, setBatch] = useState([])

  // initial range load
  useEffect(() => {
    const ids = router.query.ids ? JSON.parse(router.query.ids) : []

    if (!ids.length) return

    const loadedRanges = []

    user.folders.forEach(folder => {
      folder.ranges.forEach(range => {
        if (ids.includes(range.id)) {
          loadedRanges.push(range)
        }
      })
    })

    const loadedRange = sample(loadedRanges)

    setRanges(loadedRanges)
    setRange(loadedRange)
    setSpot(loadedRange.spot)
    setHoleCards(sampleHoleCards(loadedRange))
    setRandomNumber(rng())
    setSessionId(uuid())
  }, [router.isReady])

  // hotkeys
  useEffect(() => {
    if (range) {
      function handleKeyPress(event) {
        const n = range.options.length
        const listenFor = [...Array(n + 1).keys()].slice(1).map(i => String(i))

        if (listenFor.includes(event.key)) {
          handleCheckAnswer(range.options[Number(event.key) - 1])
        }
      }

      document.removeEventListener('keydown', handleKeyPress)
      document.addEventListener('keydown', handleKeyPress)

      return () => {
        document.removeEventListener('keydown', handleKeyPress)
      }
    }
  }, [range, holeCards, randomNumber, wasWrong])

  // logging
  useEffect(() => {
    (async () => {
      const n = batch.length

      if (n >= 5) {
        try {
          const res = await fetch('/api/logs/training', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(batch)
          })

          const json = await res.json()

          if (json.success) {
            setBatch(prev => prev.slice(n))
            /// DEV ONLY
            if (process.env.NODE_ENV !== 'production') {
              toast.success(`batch of ${n} stored.`)
            }
            
          }
        } catch (error) {
          console.log(error)
          /// DEV ONLY
          if (process.env.NODE_ENV !== 'production') {
            toast.error('unexpected batch error occurred.')
          }
        }
      }
    })()
  }, [batch])

  // border flash feedback
  useEffect(() => {
    return () => {
      if (timer) { clearTimeout(timer) }
    }
  }, [timer])

  function activateFlash(result) {
    setFlash(result)
    if (timer) { clearTimeout(timer) }
    const newTimer = setTimeout(() => { setFlash(null) }, 850)
    setTimer(newTimer)
  }

  // check answer function
  function isCorrect(option) {
    const { strategy } = range.matrix.find(c => c.combo === holeCards)

    for (let i = 0, sum = 0; i < strategy.length; i++) {
      sum += strategy[i]

      if (randomNumber / 100 < sum) {
        return isEqual(option, range.options[i])
      }
    }
  }

  function addStat(correct) {
    setStats(prev => prev.concat([{
      holeCards,
      rangeId: range.id,
      rangeName: range.name,
      correct
    }]))
  }

  function addToBatch(correct) {
    setBatch(prev => prev.concat([{
      rangeId: range.id,
      correct
    }]))
  }

  function handleCheckAnswer(option) {
    if (isCorrect(option)) {
      activateFlash('correct')
      if (!wasWrong) { addStat(true); addToBatch(true); setCount(prev => prev + 1) }
      setWasWrong(false)
      const newRange = sample(ranges)
      setRange(newRange)
      setSpot(newRange.spot)
      setHoleCards(sampleHoleCards(newRange))
      setRandomNumber(rng())
    } else {
      activateFlash('incorrect')
      if (!wasWrong) { addStat(false); addToBatch(false); setCount(prev => prev + 1) }
      setWasWrong(true)
    }
  }

  return (
    <div className='grow bg-neutral-900'>
      <Toolbar
        setSidebarInView={setSidebarInView}
        setStatsInView={setStatsInView}
      />
      <div className='flex justify-between'>
        {sidebarInView &&
          <Sidebar
            user={user}
          />
        }
        {range &&
          <div className='grow p-5 flex flex-col items-center gap-7'>
            <h1 className='text-xl'>
              {range.name}
            </h1>
            <History
              range={range}
              spot={spot}
              setSpot={setSpot}
            />
            <Table
              spot={spot}
              holeCards={holeCards}
              heroPosition={range.spot.p}
              flash={flash}
            />
            <RandomNumber
              randomNumber={randomNumber}
            />
            <AnswerButtons
              range={range}
              handleCheckAnswer={handleCheckAnswer}
            />
            <div>{count} / {user.settings.sessionLength}</div>
          </div>
        }
        {statsInView &&
          <Stats
            stats={stats}
          />
        }
      </div>
    </div>
  )
}