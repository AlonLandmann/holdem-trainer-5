import { useEffect, useMemo, useState } from 'react'
import SessionToolbar from './SessionToolbar'
import SessionMain from './SessionMain'
import { isEqual, sample } from 'lodash'
import { sampleHoleCards } from '@/lib/cards'
import { rng } from '@/lib/rounding'
import { v4 as uuid } from 'uuid'

export default function TrainerSessionPage({ user, setPage, selected, nrCombos, stats, setStats }) {
  const sessionId = useMemo(() => uuid(), [])
  const ranges = useMemo(() => {
    const loadedRanges = []

    user.folders.forEach(folder => {
      folder.ranges.forEach(range => {
        if (selected.includes(range.id)) {
          loadedRanges.push(range)
        }
      })
    })

    return loadedRanges
  }, [])

  const [range, setRange] = useState(sample(ranges))
  const [spot, setSpot] = useState(range.spot)
  const [holeCards, setHoleCards] = useState(sampleHoleCards(range))
  const [randomNumber, setRandomNumber] = useState(rng())
  const [flash, setFlash] = useState(null)
  const [timer, setTimer] = useState(null)
  const [wasWrong, setWasWrong] = useState(false)
  const [count, setCount] = useState(1)

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

      if (randomNumber / 100 < sum || (sum === 1 && randomNumber === 100)) {
        return isEqual(option, range.options[i])
      }
    }
  }

  function addStat(correct) {
    setStats(prev => prev.concat([{
      holeCards,
      rangeId: range.id,
      rangeName: range.name,
      rangeComplexity: range.complexity,
      correct
    }]))
  }

  async function logCombo(correct) {
    try {
      await fetch('/api/logs/training', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          sessionId,
          rangeId: range.id,
          correct,
          complexity: range.complexity,
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  function handleCheckAnswer(option) {
    if (isCorrect(option)) {
      activateFlash('correct')
      if (!wasWrong) { addStat(true); logCombo(true) }
      if (count >= nrCombos) { setPage('end') }
      setCount(prev => prev + 1)
      setWasWrong(false)
      const newRange = sample(ranges)
      setRange(newRange)
      setSpot(newRange.spot)
      setHoleCards(sampleHoleCards(newRange))
      setRandomNumber(rng())
    } else {
      activateFlash('incorrect')
      if (!wasWrong) { addStat(false); logCombo(false) }
      setWasWrong(true)
    }
  }

  return (
    <div className='grow'>
      <SessionToolbar
        setPage={setPage}
        count={count}
        stats={stats}
        nrCombos={nrCombos}
      />
      <SessionMain
        range={range}
        spot={spot}
        setSpot={setSpot}
        holeCards={holeCards}
        flash={flash}
        randomNumber={randomNumber}
        handleCheckAnswer={handleCheckAnswer}
      />
    </div>
  )
}