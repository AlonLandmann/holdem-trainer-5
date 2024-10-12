import { isValid } from '@/lib/cards'
import { isEqual } from 'lodash'

function optionFraction(range, option) {
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

  return frequencyTotal / total
}

export function optionPercentage(range, option) {
  return (100 * optionFraction(range, option)).toFixed(1)
}

export function overallStrategy(range) {
  return range.options.map(o => optionFraction(range, o))
}