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
  return values.toReversed().indexOf(value) + 2
}

export function numFromSuit(suit) {
  return suits.toReversed().indexOf(suit) + 1
}