import { positions } from '@/lib/spots'
import TableBoard from '@/components/trainer/TableBoard'
import TableChips from '@/components/trainer/TableChips'
import TableDealerButton from '@/components/trainer/TableDealerButton'
import TableSeat from '@/components/trainer/TableSeat'
import { clamp } from 'lodash'

const MIN_WIDTH = 280
const MAX_WIDTH = 710
const hToW = 710 / 510
const wToH = 510 / 710

// the red we used before: #c43333

export default function Table({ spot, holeCards, heroPosition, flash, availableWidth, availableHeight }) {
  const width = clamp(Math.min(availableWidth, hToW * availableHeight), MIN_WIDTH, MAX_WIDTH)
  const height = wToH * width

  return (
    <div className='relative flex justify-center items-center' style={{ width, height }}>
      {positions.map((_, i) => (
        <TableSeat
          key={'seat' + i}
          spot={spot}
          seat={i}
          heroPosition={heroPosition}
          combo={i === 0 ? holeCards : null}
          tableWidth={width}
        />
      ))}
      <div
        className={`
          border flex justify-center items-center bg-[#181818]
          ${flash === 'correct' ? 'border-[#66c24a]' : ''}
          ${flash === 'incorrect' ? 'border-neutral-6001' : ''}
        `}
        style={{
          width: 0.901 * width,
          height: 0.686 * height,
          borderRadius: 0.343 * height,
        }}
      >
        <TableBoard
          spot={spot}
          tableWidth={width}
        />
        <div
          className='relative flex justify-center items-center text-[100px] bg-[#141414]'
          style={{
            width: 0.817 * width,
            height: 0.569 * height,
            borderRadius: 0.284 * height,
          }}
        >
          <div
            className='font-decorative text-neutral-800 select-none'
            style={{ fontSize: 0.141 * width }}
          >
            HT
          </div>
          {positions.map((_, i) => (
            <TableChips
              key={'chips' + i}
              spot={spot}
              heroPosition={heroPosition}
              seat={i}
              tableWidth={width}
            />
          ))}
          <TableDealerButton
            heroPosition={heroPosition}
            tableWidth={width}
          />
        </div>
      </div>
    </div>
  )
}