import { sample } from 'lodash'

export const values = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
export const suits = ['s', 'h', 'd', 'c']
export const deck = []
export const combos = []

for (let i = 0; i < 13; i++) {
  for (let j = 0; j < 4; j++) {
    deck.push(values[i] + suits[j])
  }
}

for (let i = 0; i < 51; i++) {
  for (let j = i + 1; j < 52; j++) {
    combos.push(deck[i] + deck[j])
  }
}

export function numFromValue(value) {
  // return values.toReversed().indexOf(value) + 2 <--- caused errors in production...
  return 14 - values.indexOf(value)
}

export function numFromSuit(suit) {
  // return suits.toReversed().indexOf(suit) + 1 <--- caused errors in production...
  return 4 - suits.indexOf(suit)
}

export function sameValue(combo1, combo2) {
  return combo1[0] === combo2[0] && combo1[2] === combo2[2]
}

export function sameSuitedness(combo1, combo2) {
  return combo1[1] === combo2[1] && combo1[3] === combo2[3]
}

export function sameParity(c1, c2) {
  const p1 = c1[0] === c1[2]
  const p2 = c2[0] === c2[2]

  return (p1 && p2) || (!p1 && !p2)
}

export function includingValue(value) {
  return combos.filter(c => c[0] === value || c[2] === value)
}

export function cardsFromCombo(combo) {
  return [combo.slice(0, 2), combo.slice(2, 4)]
}

export function isValid(combo, board) {
  const [c1, c2] = cardsFromCombo(combo)
  return (c1 !== c2 && !board.includes(c1) && !board.includes(c2))
}

export function sampleFromDeck(n, usedCards = []) {
  let deckCopy = deck.filter(c => !usedCards.includes(c))
  let result = []

  for (let i = 0; i < n; i++) {
    const index = Math.floor(deckCopy.length * Math.random())
    result[i] = deckCopy.splice(index, 1)[0]
  }

  return result
}

export function sampleHoleCards(range) {
  const inRange = range.matrix.filter(a => a.frequency > 0).map(a => a.combo)
  const validCombos = inRange.filter(c => isValid(c, range.spot.board))
  return sample(validCombos)
}

export function suitIcon(suit, fill = true) {
  const map = {
    's': 'spade',
    'h': 'heart',
    'd': 'diamond',
    'c': 'club'
  }

  return `bi bi-suit-${map[suit]}${fill ? '-fill' : ''}`
}
