import { positions } from '@/lib/spots'
import TableBoard from '@/components/trainer/TableBoard'
import TableChips from '@/components/trainer/TableChips'
import TableDealerButton from '@/components/trainer/TableDealerButton'
import TableSeat from '@/components/trainer/TableSeat'

// the red we used before: #c43333

export default function Table({ spot, holeCards, heroPosition, flash }) {
  return (
    <div className='relative h-[510px] w-[710px] flex justify-center items-center'>
      {positions.map((_, i) => (
        <TableSeat
          key={'seat' + i}
          spot={spot}
          seat={i}
          heroPosition={heroPosition}
          combo={i === 0 ? holeCards : null}
        />
      ))}
      <div className={`
        h-[350px] w-[640px] border rounded-[175px] flex
        justify-center items-center bg-[#181818]
        ${flash === 'correct' ? 'border-[#66c24a]' : ''}
        ${flash === 'incorrect' ? 'border-neutral-6001' : ''}
      `}>
        <TableBoard spot={spot} />
        <div className={`
          relative h-[290px] w-[580px] rounded-[145px] flex
          justify-center items-center text-[100px] bg-[#141414]
        `}>
          <div className='font-decorative text-neutral-800 select-none text-[100px]'>
            HT
          </div>
          {positions.map((_, i) => (
            <TableChips
              key={'chips' + i}
              spot={spot}
              heroPosition={heroPosition}
              seat={i}
            />
          ))}
          <TableDealerButton
            heroPosition={heroPosition}
          />
        </div>
      </div>
    </div>
  )
}