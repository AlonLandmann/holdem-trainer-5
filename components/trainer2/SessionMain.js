import AnswerButtons from '../trainer/AnswerButtons'
import History from '../trainer/History'
import RandomNumber from '../trainer/RandomNumber'
import Table from '../trainer/Table'

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