import { useEffect, useState } from 'react'
import Button from '../_ui/Button'
import Matrix from '../editor/Matrix'
import Table from '../trainer/Table'
import { isEqual, sample } from 'lodash'
import { sampleHoleCards } from '@/lib/cards'
import RandomNumber from '../trainer/RandomNumber'
import AnswerButtons from '../trainer/AnswerButtons'
import { rng } from '@/lib/rounding'
import History from '../trainer/History'

export default function Hero({ ranges }) {
  const [range, setRange] = useState(ranges[0])
  const [spot, setSpot] = useState(range.spot)
  const [holeCards, setHoleCards] = useState('AdKc')
  const [randomNumber, setRandomNumber] = useState(80)
  const [flash, setFlash] = useState(null)
  const [timer, setTimer] = useState(null)
  const [hovered, setHovered] = useState([])

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
    <section className=''>
      <div className='py-2 pl-5 pr-3 flex justify-between items-center gap-5 border-b'>
        <h1 className='mb-1 text-xl font-medium text-neutral-50 md:text-2xl'>
          Refine your game
        </h1>
        <h3 className='text-neutral-500 text-sm md:text-base'>
          Create your own custom poker ranges and train them on Hold'em Trainer.
        </h3>
        <div className='flex gap-3'>
          <Button
            theme='nice'
            utilClasses='rounded-sm py-3 px-4 bg-opacity-80'
            text='Create an account'
            onClick={() => { window.location = '/auth/signup' }}
          />
          <Button
            theme='secondary'
            utilClasses='rounded-sm py-3 px-4 bg-opacity-100 bg-neutral-900'
            text='Watch user guide'
            onClick={() => { window.open('https://www.youtube.com/watch?v=z6PkfQihrUc', '_blank') }}
          />
        </div>
      </div>
      <div className='py-5 flex flex-wrap justify-center gap-10'>
        <div className='flex flex-col justify-around gap-5 items-center'>
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
        </div>
        <Matrix
          range={range}
          selected={[holeCards]}
          setSelected={() => { }}
          hovered={hovered}
          setHovered={setHovered}
          optionHover={null}
        />
      </div>
    </section>
  )
}