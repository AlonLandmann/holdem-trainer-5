import { positions } from '@/lib/shared/spots'
import TableSeat from './TableSeat'
import Card from './Card'

export default function Table({ spot, holeCards, heroPosition, flash }) {
  return (
    <div className='relative h-[510px] w-[710px] flex justify-center items-center'>
      {positions.map((_, i) => (
        <TableSeat
          key={'seat' + i}
          spot={spot}
          seat={i}
          combo={i === 0 ? holeCards : null}
          heroPosition={heroPosition}
        />
      ))}
      <div className={`
        h-[350px] w-[640px] border rounded-[175px] flex
        justify-center items-center bg-[#181818]
        ${flash === 'correct' ? 'border-[#66c24a]' : ''}
        ${flash === 'incorrect' ? 'border-[#c43333]' : ''}
      `}>
        {spot.board.length > 0 &&
          <div className='absolute z-10 rounded-[3px] p-1 flex gap-1 bg-[#11111188]'>
            {spot.board.map((card, i) => (
              <Card key={'card' + i} card={card} />
            ))}
            <div className='absolute top-full mt-1 left-1/2 -translate-x-1/2 text-sm flex items-center gap-2 text-neutral-500'>
              <i className='bi bi-database'></i>
              <div>{spot.pot - spot.committedAtRound.reduce((a, c) => a + c, 0)}</div>
            </div>
          </div>
        }
        <div className='relative h-[290px] w-[580px] rounded-[145px] flex justify-center items-center text-[100px] bg-[#141414]'>
          <div className='font-decorative text-neutral-800 select-none text-[100px]'>
            HT
          </div>
        </div>
      </div>
    </div>
  )
}