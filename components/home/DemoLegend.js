import { isValid } from '@/lib/cards'
import { sortBy } from 'lodash'
import DemoLegendItem from './DemoLegendItem'

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
        <DemoLegendItem
          key={key}
          range={range}
          comboArray={brushes[key]}
          strategy={key.split(',').map(p => Number(p))}
          setHovered={setHovered}
        />
      ))}
    </div>
  )
}