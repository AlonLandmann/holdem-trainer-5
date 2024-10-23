import { strategyColor } from '@/lib/colors'
import StrategyPreview from '../editor/StrategyPreview'
import { capitalize } from 'lodash'

export default function DemoLegendItem({ range, comboArray, strategy, setHovered }) {
  const n = strategy.length

  return (
    <div
      className='flex items-center gap-3 py-2 px-3 border rounded select-none'
      onMouseEnter={() => { setHovered(comboArray) }}
      onMouseLeave={() => { setHovered([]) }}
    >
      <div
        className='w-[15px] h-[15px]'
        style={{ background: strategyColor(range, strategy) }}
      >

      </div>
      <div className='flex text-neutral-300 text-sm'>
        {range.options.map((option, i) => (
          <div
            key={'option' + i}
            className={`flex gap-4 justify-between ${i === 0 ? 'border-l min-w-[145px]' : 'min-w-32' } px-3 border-r`}
          >
            <div>
              {capitalize(option.type)}{option.size ? ` ${option.size}` : ''}
            </div>
            <div>
              {strategy[i] * 100}
            </div>
          </div>
        ))}
      </div>
      <StrategyPreview
        range={range}
        strategy={strategy}
      />
    </div>
  )
}