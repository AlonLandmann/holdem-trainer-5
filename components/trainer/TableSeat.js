import Card from '@/components/trainer/Card'
import { scaleTableElement } from '@/lib/scaling'
import { positions } from '@/lib/spots'

export default function TableSeat({ spot, seat, heroPosition, combo, tableWidth }) {
  const p = (heroPosition + seat) % 6

  const h = scaleTableElement(45, tableWidth, 2, 0)
  const v1 = scaleTableElement(60, tableWidth, 2, 0)
  const v2 = scaleTableElement(15, tableWidth, 3.2, 0)

  const layout = [
    { left: '50%', transform: 'translateX(-50%)', bottom: v2 },
    { left: h, bottom: v1 },
    { left: h, top: v1 },
    { left: '50%', transform: 'translateX(-50%)', top: v2 },
    { right: h, top: v1 },
    { right: h, bottom: v1 }
  ]

  return (
    <div
      className='absolute flex flex-col items-center gap-[1px] z-10'
      style={{
        ...(layout[seat]),
        fontSize: scaleTableElement(14, tableWidth, 0.5, 10)
      }}
    >
      <div className='text-neutral-500'>
        {positions[p]}
      </div>
      <div className={`flex justify-center gap-[2px] ${spot.hasFolded[p] ? 'opacity-10' : ''}`}>
        <Card card={combo ? combo.slice(0, 2) : null} tableWidth={tableWidth} />
        <Card card={combo ? combo.slice(2, 4) : null} tableWidth={tableWidth} />
      </div>
      <div className='text-neutral-500 truncate'>
        {spot.stacksAtRound[p] - spot.committedAtRound[p]}
        {spot.lastActions[p] && <span> | {spot.lastActions[p]}</span>}
      </div>
    </div>
  )
}