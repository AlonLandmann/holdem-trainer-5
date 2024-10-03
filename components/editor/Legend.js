import Category from '@/components/editor/Category'
import { isValid } from '@/lib/cards'
import { reverse, sortBy } from 'lodash'

export default function Legend({ range, setHovered, setSelected }) {
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
    <div className='border rounded py-3 px-[18px] bg-neutral-[#202020] opacity-80'>
      <div className='pb-1 text-neutral-400'>
        Legend
      </div>
      <div className='flex flex-col'>
        {reverse(sortBy(Object.keys(brushes), [])).map(key => (
          <div
            key={key}
            className={range.spot.street !== 'preflop' ? 'grid gap-1' : ''}
            style={{ gridTemplateColumns: '1fr 30px' }}
          >
            <Category
              range={range}
              comboArray={brushes[key]}
              name={'--use-strategy--'}
              fraction={frequencyTotals[key] / total}
              strategy={key.split(',').map(p => Number(p))}
              setSelected={setSelected}
              setHovered={setHovered}
            />
          </div>
        ))}
      </div>
    </div>
  )
}