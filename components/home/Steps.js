import { useEffect, useState } from 'react'
import Matrix from '../editor/Matrix'
import { isEqual, sample } from 'lodash'
import { sampleHoleCards } from '@/lib/cards'
import Table from '../trainer/Table'
import RandomNumber from '../trainer/RandomNumber'
import AnswerButtons from '../trainer/AnswerButtons'
import History from '../trainer/History'
import { rng } from '@/lib/rounding'
import DemoLegend from './DemoLegend'

export default function Steps({ ranges, initialIndex }) {
  const [hovered, setHovered] = useState([])
  const [range, setRange] = useState(ranges[initialIndex])
  const [spot, setSpot] = useState(range.spot)
  const [holeCards, setHoleCards] = useState('AdKc')
  const [randomNumber, setRandomNumber] = useState(80)
  const [flash, setFlash] = useState(null)
  const [timer, setTimer] = useState(null)

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
  }, [range, holeCards, randomNumber])

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

  function handleCheckAnswer(option) {
    if (isCorrect(option)) {
      activateFlash('correct')
      const newRange = sample(ranges)
      setRange(newRange)
      setSpot(newRange.spot)
      setHoleCards(sampleHoleCards(newRange))
      setRandomNumber(rng())
    } else {
      activateFlash('incorrect')
    }
  }

  return (
    <section className='border-b py-32 px-20'>
      <div className='flex flex-wrap justify-center gap-28 mb-36'>
        <div className='max-w-[500px]'>
          <h1 className='pt-28 text-4xl mb-8 text-neutral-500'>
            1. Define your strategy
          </h1>
          <p className='leading-8 text-lg text-neutral-300 mb-5'>
            In our editor you will be able to define ranges such as the one presented here ({range.name}).
            Each cell in the matrix corresponds to a particular combo of hole cards.
            Each larger grid cell contains combos with cards of the same value, and each smaller cell specifies the exact suits.
          </p>
          <p className='leading-8 text-lg text-neutral-300 mb-5'>
            The cells in the top right corner declare which action we want to take how often in this spot.
            The cells in the bottom left give an indication of how frequently we find ourselves having each combo in this scenario.
          </p>
          <p className='leading-8 text-lg text-neutral-300'>
            Hover over the items in the legend below the matrix to get a clear view of what we would like to do with each combo in the range.
          </p>
        </div>
        <div className='flex flex-col justify-around items-center gap-5'>
          <Matrix
            range={range}
            selected={[]}
            setSelected={() => { }}
            hovered={hovered}
            setHovered={setHovered}
            optionHover={null}
            cellWidth={11}
          />
          <DemoLegend
            range={range}
            setHovered={setHovered}
            setSelected={() => { }}
          />
        </div>
      </div>
      <div className='flex flex-wrap justify-center gap-28'>
        <div className='max-w-[500px]'>
          <h1 className='pt-28 text-4xl mb-8 text-neutral-500'>
            2. Train it
          </h1>
          <p className='leading-8 text-lg text-neutral-300 mb-5'>
            In the trainer app, you will see the scenario related to the range from step 1.
            You can click on the arrows at the top of the simulator to navigate through the hand's history.
          </p>
          <p className='leading-8 text-lg text-neutral-300 mb-5'>
            Use the answer buttons in the bottom to test yourself on the strategy presented in step 1.
          </p>
          <p className='leading-8 text-lg text-neutral-300 mb-5'>
            If the strategy for a specific combo is mixed (e.g. 50% fold and 50% call),
            use the random number generator above the answer buttons
            to reach a decision. In the given example, any number from 0.1 to 50.0 would indicate a fold,
            and any number for 50.1 to 100.0 would indicate a call.
          </p>
          <p className='leading-8 text-lg text-neutral-300'>
            After after each correct answer the demo will provide you with a new range to try out.
          </p>
        </div>
        <div className='flex flex-col justify-around gap-5 items-center'>
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
        </div>
      </div>
    </section>
  )
}