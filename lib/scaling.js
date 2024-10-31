import { clamp } from 'lodash'

const DEFAULT_WIDTH = 710

export function scaleTableElement(base, width, power, min = 0, max = Infinity) {
  return clamp(base * Math.pow(width / DEFAULT_WIDTH, power), min, max)
}