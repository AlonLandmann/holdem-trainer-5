import { isValid } from '@/lib/cards'
import { isEqual } from 'lodash'

export function optionPercentage(range, option) {
  let frequencyTotal = 0
  let total = 0

  range.matrix.forEach(c => {
    if (!isValid(c.combo, range.spot.board) || !c.frequency) {
      return
    }

    range.options.forEach((o, i) => {
      if (isEqual(o, option)) {
        frequencyTotal += c.frequency * c.strategy[i]
      }

      total += c.frequency * c.strategy[i]
    })
  })

  return (100 * frequencyTotal / total).toFixed(1)
}