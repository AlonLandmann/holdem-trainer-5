import useWindowDimensions from '@/hooks/useWindowDimensions'
import AnswerButtons from './AnswerButtons'
import History from './History'
import RandomNumber from './RandomNumber'
import Table from './Table'

export default function SessionMain({
  range,
  spot,
  setSpot,
  holeCards,
  flash,
  randomNumber,
  handleCheckAnswer,
}) {
  const [width, height] = useWindowDimensions()
  const availableWidth = width - 112 
  const availableHeight = height - 357 - (range.options.length > 5 ? 66 : 0)

  return (
    <div className='grow overflow-y-auto' style={{ height: 'calc(100vh - 49px)' }}>
      <div className='p-7 flex flex-col gap-7 justify-around items-center'>
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
  )
}