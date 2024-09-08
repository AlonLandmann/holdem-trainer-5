import Card from './Card'

export default function TableBoard({ spot }) {
  return spot.board.length === 0 ? null : (
    <div className='absolute z-10 rounded-[3px] p-1 flex gap-1 bg-[#11111188]'>
      {spot.board.map((card, i) => (
        <Card key={'card' + i} card={card} />
      ))}
      <div className='absolute top-full mt-1 left-1/2 -translate-x-1/2 text-sm flex items-center gap-2 text-neutral-500'>
        <i className='bi bi-database'></i>
        <div>{spot.pot - spot.committedAtRound.reduce((a, c) => a + c, 0)}</div>
      </div>
    </div>
  )
}