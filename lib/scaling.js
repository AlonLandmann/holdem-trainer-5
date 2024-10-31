import { clamp } from 'lodash'

const DEFAULT_WIDTH = 710

export function scaleTableElement(base, width, power, min = 0, max = Infinity) {
  return clamp(base * Math.pow(width / DEFAULT_WIDTH, power), min, max)
}

export function answerButtonsHeight(n, availableWidth) {
  const buttonsPerRow = Math.min(5, Math.floor((availableWidth - 128) / 138) + 1)
  const nrAnswerButtonRows = Math.ceil(n / buttonsPerRow)
  return 56 + (nrAnswerButtonRows - 1) * 66
}