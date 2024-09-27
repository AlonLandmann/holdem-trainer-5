import { random } from 'lodash'

const firstParts = [
  'Club',
  'Diamond',
  'Heart',
  'Spade',
  'Poker',
  'Texas',
  "Hold'em",
  'Card'
]

const secondParts = [
  'Hero',
  'Janissary',
  'Gladiator',
  'Destroyer',
  'Ninja',
  'Admiral',
  'Master'
]

const F = firstParts.length
const S = secondParts.length

export function generateUsername() {
  return firstParts[random(F - 1)] + ' ' + secondParts[random(S - 1)]
} 