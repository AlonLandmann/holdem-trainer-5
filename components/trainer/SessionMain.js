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
  return (
    <div
      className='grow p-8 flex flex-col justify-around items-center gap-7'
      style={{ minHeight: 'calc(100vh - 49px)' }}
    >
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
  )
}