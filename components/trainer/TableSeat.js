import { positions } from '@/lib/spots'
import Card from './Card'

export default function TableSeat({ spot, seat, heroPosition, combo }) {
  const p = (heroPosition + seat) % 6

  const layout = [
    { left: '50%', transform: 'translateX(-50%)', bottom: '15px' },
    { left: '45px', bottom: '60px' },
    { left: '45px', top: '60px' },
    { left: '50%', transform: 'translateX(-50%)', top: '15px' },
    { right: '45px', top: '60px' },
    { right: '45px', bottom: '60px' }
  ]

  return (
    <div
      className='absolute h-[90px] w-[80px] flex flex-col items-center gap-[1px] text-sm z-10'
      style={layout[seat]}
    >
      <div className='text-neutral-500'>
        {positions[p]}
      </div>
      <div className={`h-[50px] w-[80px] flex justify-center gap-[2px] ${spot.hasFolded[p] ? 'opacity-10' : ''}`}>
        <Card card={combo ? combo.slice(0, 2) : null} />
        <Card card={combo ? combo.slice(2, 4) : null} />
      </div>
      <div className='text-neutral-500 truncate'>
        {spot.stacksAtRound[p] - spot.committedAtRound[p]}
        {spot.lastActions[p] && <span> | {spot.lastActions[p]}</span>}
      </div>
    </div>
  )
}