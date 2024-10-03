import { optionColor } from '@/lib/colors'
import { useState } from 'react'

const HEIGHT = 20
const EACH_WIDTH = 8

export default function StrategyPreview({ range, strategy }) {
  const [tooltipInView, setToolTipInView] = useState(false)

  return (
    <div className='relative'>
      {tooltipInView &&
        <div
          className={`
            absolute -top-[27px] rounded-sm px-[3px] py-[2px] text-nowrap
            text-center text-sm text-neutral-400 bg-neutral-950
          `}
          style={{
            left: `calc(50% - ${22 * strategy.length}px)`,
            width: `${44 * strategy.length}px`
          }}
        >
          {strategy.map(p => (100 * p).toFixed(1)).join(' - ')}
        </div>
      }
      <div
        className='border flex items-end'
        style={{ height: `${HEIGHT + 2}px`, width: `${strategy.length * EACH_WIDTH + 2}px` }}
        onMouseEnter={() => setToolTipInView(true)}
        onMouseLeave={() => setToolTipInView(false)}
      >
        {strategy.map((prob, i) => (
          <div
            key={'option' + i}
            style={{
              height: `${HEIGHT * prob}px`,
              width: `${EACH_WIDTH}px`,
              background: optionColor(range.options[i], range.spot)
            }}
          />
        ))}
      </div>
    </div>
  )
}