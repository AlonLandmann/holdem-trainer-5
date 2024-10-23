import { isValid } from '@/lib/cards'
import { strategyColor } from '@/lib/colors'
import { reverse, sortBy } from 'lodash'
import StrategyPreview from '../editor/StrategyPreview'
import { legendKey } from '@/lib/display'

export default function DemoLegend({ range, setHovered }) {
  let brushes = {}
  let frequencyTotals = {}
  let total = 0

  range.matrix.forEach(({ combo, frequency, strategy }) => {
    if (!isValid(combo, range.spot.board) || !frequency) {
      return
    }

    const roundedStrategy = strategy.map(prob => Math.round(prob * 1000) / 1000)
    const strategyKey = roundedStrategy.join(',')

    if (!(strategyKey in brushes)) {
      brushes[strategyKey] = [combo]
      frequencyTotals[strategyKey] = 0
    } else {
      brushes[strategyKey].push(combo)
    }

    frequencyTotals[strategyKey] += frequency
    total += frequency
  })

  return (!range.spot.options) ? null : (
    <div className='py-3 px-4 text-neutral-300 flex flex-col items-start gap-2'>
      {sortBy(Object.keys(brushes), []).map(key => (
        <div
          key={key}
          className='flex items-center gap-2'
          style={{}}
          onMouseEnter={() => { setHovered(brushes[key]) }}
          onMouseLeave={() => { setHovered([]) }}
        >
          {/* <Category
              range={range}
              comboArray={brushes[key]}
              name={'--use-strategy--'}
              fraction={frequencyTotals[key] / total}
              strategy={key.split(',').map(p => Number(p))}
              setSelected={() => {}}
              setHovered={setHovered}
            /> */}
          <div
            className='w-[15px] h-[15px] rounded-sm'
            style={{ background: strategyColor(range, key.split(',').map(p => Number(p))) }}
          >

          </div>
          <div>
            {legendKey(range.options, key.split(',').map(p => Number(p)))}
          </div>
          <StrategyPreview
            range={range}
            strategy={key.split(',').map(p => Number(p))}
          />
        </div>
      ))}
    </div>
  )
}