import { capitalize } from 'lodash'

export function actionInTrainerHistory(action) {
  if (action.cards) {
    return '⋅'
  } else if (action.size) {
    return action.size
  } else {
    return action.type[0].toUpperCase()
  }
}

export function selectedForTraining(n) {
  if (n === 0) {
    return 'No ranges selected for training'
  } else if (n === 1) {
    return '# 1 range selected for training'
  } else {
    return `# ${n} ranges selected for training`
  }
}

export function accuracy(stats) {
  return stats.length > 0
    ? `${(100 * stats.reduce((p, c) => (p + Number(c.correct)), 0) / stats.length).toFixed(1)} %`
    : ''
}

export function withSeparators(x) {
  return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}