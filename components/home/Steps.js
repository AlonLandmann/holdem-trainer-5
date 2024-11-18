import { useEffect, useState } from 'react'
import Matrix from '../editor/Matrix'
import { clamp, isEqual } from 'lodash'
import { sampleHoleCards } from '@/lib/cards'
import Table from '../trainer/Table'
import RandomNumber from '../trainer/RandomNumber'
import AnswerButtons from '../trainer/AnswerButtons'
import History from '../trainer/History'
import { rng } from '@/lib/rounding'
import DemoLegend from './DemoLegend'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { answerButtonsHeight } from '@/lib/scaling'

export default function Steps({ initialRange }) {
  const [hovered, setHovered] = useState([])
  const [range, setRange] = useState(initialRange)
  const [spot, setSpot] = useState(initialRange.spot)
  const [holeCards, setHoleCards] = useState('AdKd')
  const [randomNumber, setRandomNumber] = useState(77.3)
  const [flash, setFlash] = useState(null)
  const [timer, setTimer] = useState(null)

  // responsive design
  const [width, height] = useWindowDimensions()
  const availableWidth = width - (width >= 1280 ? 256 : 160)
  const availableHeight = height - 196 - (width >= 1280 ? 80 : 60) - answerButtonsHeight(range.options.length, availableWidth)

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
      // const newRange = sample(ranges)
      // setRange(newRange)
      // setSpot(newRange.spot)
      setHoleCards(sampleHoleCards(range))
      setRandomNumber(rng())
    } else {
      activateFlash('incorrect')
    }
  }

  // handle range change
  function handleRangeChange(event) {
    const newRange = [range].filter(rCandidate => rCandidate.id === Number(event.target.value))[0]
    setRange(newRange)
    setSpot(newRange.spot)
    setHoleCards(sampleHoleCards(newRange))
    setRandomNumber(rng())
  }

  return (
    <section className='border-b py-20 xl:py-32 px-12 xl:px-20 flex flex-col gap-28 overflow-x-hidden'>
      <div className='flex flex-col items-center 2xl:flex-row 2xl:items-start justify-center gap-20 xl:gap-28'>
        <div className='max-w-[500px] text-neutral-300'>
          <h1 className='text-4xl mb-8 text-neutral-500'>
            1. Define your strategy
          </h1>
          <select
            name='range'
            className='appearance-none min-w-44 mb-5'
            value={String(range.id)}
            onChange={handleRangeChange}
          >
            {[range].map(r => (
              <option key={'select-range' + r.id} value={String(r.id)}>
                {r.name}
              </option>
            ))}
          </select>
          <p className='leading-8 text-lg text-neutral-300 mb-5'>
            In our editor you will be able to define ranges such as the one presented here. Feel free to select another example from the drop down menu.
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
            cellWidth={clamp(Math.floor((availableWidth - 53) / 52), 5, 11)}
          />
          <DemoLegend
            range={range}
            setHovered={setHovered}
            setSelected={() => { }}
          />
        </div>
      </div>
      <div className='flex flex-col items-center 2xl:flex-row 2xl:items-start justify-center gap-28'>
        <div className='max-w-[500px] text-neutral-300'>
          <h1 className='text-4xl mb-8 text-neutral-500'>
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
            and any number from 50.1 to 100.0 would indicate a call.
          </p>
          <p className='leading-8 text-lg text-neutral-300'>
            After after each correct answer the demo will provide you with a new range to try out.
          </p>
        </div>
        <div className='flex flex-col justify-around gap-7 items-center'>
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
            availableWidth={availableWidth}
            availableHeight={availableHeight}
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