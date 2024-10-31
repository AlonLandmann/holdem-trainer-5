import Card from '@/components/trainer/Card'
import { scaleTableElement } from '@/lib/scaling'

export default function TableBoard({ spot, tableWidth }) {
  return spot.board.length === 0 ? null : (
    <div className='absolute z-10 rounded-[3px] p-1 flex gap-1 bg-[#11111188]'>
      {spot.board.map((card, i) => (
        <Card key={'card' + i} card={card} tableWidth={tableWidth} />
      ))}
      <div
        className='absolute top-full mt-1 left-1/2 -translate-x-1/2 flex items-center gap-2 text-neutral-500'
        style={{ fontSize: scaleTableElement(15, tableWidth, 0.5, 10) }}
      >
        <i className='bi bi-database'></i>
        <div>{spot.pot - spot.committedAtRound.reduce((a, c) => a + c, 0)}</div>
      </div>
    </div>
  )
}