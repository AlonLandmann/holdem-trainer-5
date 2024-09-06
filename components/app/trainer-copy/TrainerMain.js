import css from '@/styles/trainer/TrainerMain.module.scss'
import { isEqual, sample } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import Table from './Table'
import History from './History'
import Rng from './Rng'
import Options from './Options'
import { sampleHoleCards } from '@/lib/cards'


export default function TrainerMain({ ranges, selected, setStats, dims }) {
  const [range, setRange] = useState(sample(ranges.filter(r => selected.includes(r.id))))
  const [spot, setSpot] = useState(range.spot)
  const [holeCards, setHoleCards] = useState(sampleHoleCards(range))
  const [rn, setRn] = useState(Math.ceil(1000 * Math.random()) / 10)
  const [flash, setFlash] = useState(null)
  const [timer, setTimer] = useState(null)
  const [wasWrong, setWasWrong] = useState(false)

  const widthBasedOnHeightLeft = useMemo(() => {
    const nrOptionsPerRow = dims.w >= 640 ? 5 : (dims.w >= 510 ? 4 : 3)
    const nrOptionRows = Math.ceil(range.options.length / nrOptionsPerRow)
    const optionsHeight = nrOptionRows * 50 + (nrOptionRows - 1) * 10
    const gracePadding = 10
    const heightLeft = dims.h - 40 - 100 - 40.5 - 42 - optionsHeight - gracePadding
    return heightLeft * 710 / 510
  }, [range.options, dims])

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [timer])

  useEffect(() => {
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
  }, [range, holeCards, rn, wasWrong])

  function isCorrect(option) {
    const { strategy } = range.matrix.find(c => c.combo == holeCards)

    for (let i = 0, sum = 0; i < strategy.length; i++) {
      sum += strategy[i]

      if (rn / 100 <= sum) {
        return isEqual(option, range.options[i])
      }
    }
  }

  function setUpFlash(result) {
    setFlash(result)
    if (timer) clearTimeout(timer)
    const newTimer = setTimeout(() => { setFlash(null) }, 800)
    setTimer(newTimer)
  }

  function handleCheckAnswer(option) {
    if (isCorrect(option)) {
      setUpFlash('correct')
      if (!wasWrong) setStats(prev => prev.concat([{ holeCards, range, correct: true }]))
      setWasWrong(false)
      setRn(Math.round(1000 * Math.random()) / 10)
      const newRange = sample(ranges.filter(r => selected.includes(r.id)))
      setRange(newRange)
      setSpot(newRange.spot)
      setHoleCards(sampleHoleCards(newRange))
    } else {
      setUpFlash('incorrect')
      if (!wasWrong) setStats(prev => prev.concat([{ holeCards, range, correct: false }]))
      setWasWrong(true)
    }
  }

  return (
    <div className={css.container}>
      <div className={css.title}>
        {range.name}
      </div>
      <History
        range={range}
        spot={spot}
        setSpot={setSpot}
        dims={dims}
      />
      <Table
        spot={spot}
        holeCards={holeCards}
        originalP={range.spot.p}
        flash={flash}
        width={Math.max(400, Math.min(710, dims.w, widthBasedOnHeightLeft))}
      />
      <Rng
        rn={rn}
      />
      <Options
        range={range}
        handleCheckAnswer={handleCheckAnswer}
      />
    </div>
  )
}
