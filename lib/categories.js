import { values, cardsFromCombo, isValid, numFromValue, numFromSuit } from '@/lib/cards'
import { reverse, sortBy } from 'lodash'

export function categorize(range) {
  let result = {
    all: [],
    allStrats: Array(range.options.length).fill(0),
    strengths: {},
    strengthStrats: {},
    details: { '1 Pair': {}, 'High Card': {} },
    detailStrats: { '1 Pair': {}, 'High Card': {} },
    detailSortValues: { '1 Pair': {}, 'High Card': {} },
    draws: {},
    drawStrats: {}
  }

  range.matrix.forEach(({ combo, frequency, strategy }) => {
    if (!isValid(combo, range.spot.board)) {
      return null
    }

    result.all.push(combo)

    for (let i = 0; i < strategy.length; i++) {
      result.allStrats[i] += frequency * strategy[i]
    }

    if (range.spot.board.length < 3) {
      return null
    }

    const { strength, detail, draw: { flush, straight } } = categorizeCombo(combo, range.spot.board)

    if (!(strength in result.strengths)) {
      result.strengths[strength] = [combo]
      result.strengthStrats[strength] = Array(strategy.length).fill(0)
    } else {
      result.strengths[strength].push(combo)
    }

    for (let i = 0; i < strategy.length; i++) {
      result.strengthStrats[strength][i] += frequency * strategy[i]
    }
    
    if (['1 Pair', 'High Card'].includes(strength)) {
      if (!(detail in result.details[strength])) {
        result.details[strength][detail] = [combo]
        result.detailSortValues[strength][detail] = detailSortValue(combo, range.spot.board, strength)
        result.detailStrats[strength][detail] = Array(strategy.length).fill(0)
      } else {
        result.details[strength][detail].push(combo)
      }
      
      for (let i = 0; i < strategy.length; i++) {
        result.detailStrats[strength][detail][i] += frequency * strategy[i]
      }
    }

    if (range.spot.board.length == 5) {
      return null
    }

    if (!(flush in result.draws)) {
      result.draws[flush] = [combo]
      result.drawStrats[flush] = Array(strategy.length).fill(0)
    } else {
      result.draws[flush].push(combo)
    }

    for (let i = 0; i < strategy.length; i++) {
      result.drawStrats[flush][i] += frequency * strategy[i]
    }

    if (!(straight in result.draws)) {
      result.draws[straight] = [combo]
      result.drawStrats[straight] = Array(strategy.length).fill(0)
    } else {
      result.draws[straight].push(combo)
    }

    for (let i = 0; i < strategy.length; i++) {
      result.drawStrats[straight][i] += frequency * strategy[i]
    }
  })

  return result
}

export function retrieveInOrder(categories, type, strength) {
  const strengthOrder = ['Straight Flush', 'Quads', 'Full House', 'Flush', 'Straight', 'Trips', '2 Pair', '1 Pair', 'High Card']
  const drawOrder = ['Flush Draw', 'Back Door FD', 'No FD', 'Open Ended SD', 'Gutshot', 'No SD']
  
  switch (type) {
    case 'strengths':
      return sortBy(Object.keys(categories.strengths), strength => strengthOrder.indexOf(strength))
    case 'details':
      return sortBy(Object.keys(categories.details[strength]), draw => -categories.detailSortValues[strength][draw])
    case 'draws':
      return sortBy(Object.keys(categories.draws), draw => drawOrder.indexOf(draw))
    default:
      return []
  }
}

export function categorizePreflop(range) {
  let result = {
    all: [],
    allStrats: Array(range.options.length).fill(0),
    strengths: {},
    strengthStrats: {},
    draws: {},
    drawStrats: {}
  }

  range.matrix.forEach(({ combo, frequency, strategy }) => {
    result.all.push(combo)

    for (let i = 0; i < strategy.length; i++) {
      result.allStrats[i] += frequency * strategy[i]
    }

    const { strength, draw: { flush, straight } } = categorizePreflopCombo(combo)

    if (!(strength in result.strengths)) {
      result.strengths[strength] = [combo]
      result.strengthStrats[strength] = Array(strategy.length).fill(0)
    } else {
      result.strengths[strength].push(combo)
    }

    for (let i = 0; i < strategy.length; i++) {
      result.strengthStrats[strength][i] += frequency * strategy[i]
    }

    if (!(flush in result.draws)) {
      result.draws[flush] = [combo]
      result.drawStrats[flush] = Array(strategy.length).fill(0)
    } else {
      result.draws[flush].push(combo)
    }

    for (let i = 0; i < strategy.length; i++) {
      result.drawStrats[flush][i] += frequency * strategy[i]
    }

    if (!(straight in result.draws)) {
      result.draws[straight] = [combo]
      result.drawStrats[straight] = Array(strategy.length).fill(0)
    } else {
      result.draws[straight].push(combo)
    }

    for (let i = 0; i < strategy.length; i++) {
      result.drawStrats[straight][i] += frequency * strategy[i]
    }
  })

  return result
}

export function retrievePreflopInOrder(categories, type) {
  const strengthOrder = ['pair', 'high card']
  const drawOrder = ['suited', 'offsuit', 'connected', 'gapped', 'not con.']

  switch (type) {
    case 'strengths':
      return sortBy(Object.keys(categories.strengths), strength => strengthOrder.indexOf(strength))
    case 'draws':
      return sortBy(Object.keys(categories.draws), draw => drawOrder.indexOf(draw))
    default:
      return []
  }
}

function flushCount(s) {
  const counts = {}
  s.forEach(suitNum => { counts[suitNum] = (counts[suitNum] || 0) + 1 })
  return Math.max(...Object.values(counts))
}

function detectFlush(s) {
  return flushCount(s) >= 5
}

function detectFlushDraw(s, strength) {
  if (['Straight Flush', 'Quads', 'Full House', 'Flush'].includes(strength)) return 'No FD'
  const maxSuitCount = flushCount(s)
  if (maxSuitCount == 4) return 'Flush Draw'
  if (maxSuitCount == 3 && s.length == 5) return 'Back Door FD'
  return 'No FD'
}

function isStraight(v) {
  if (v[0] == v[1] + 1 && v[1] == v[2] + 1 && v[2] == v[3] + 1 && v[3] == v[4] + 1) return true
  if (v[0] == 14 && v[1] == 5 && v[2] == 4 && v[3] == 3 && v[4] == 2) return true
  return false
}

function detectStraight(v) {
  for (let i = 0; i < v.length - 4; i++) {
    if (isStraight(v.slice(i, i + 5))) {
      return true
    }
  }

  return false
}

function detectStraightDraw(v, strength) {
  if (['Straight Flush', 'Quads', 'Full House', 'Flush', 'Straight'].includes(strength)) return 'No SD'
  let count = 0
  for (let i = 2; i <= 14; i++) {
    if (detectStraight(reverse(sortBy([...v, i], [])))) {
      count++
    }
  }
  if (count >= 2) return 'Open Ended SD'
  if (count == 1) return 'Gutshot'
  return 'No SD'
}

function detectParity(v) {
  const counts = {}
  v.forEach(valueNum => { counts[valueNum] = (counts[valueNum] || 0) + 1 })
  const countsArray = Object.values(counts)
  const max = Math.max(...countsArray)
  if (max == 4) return 'Quads'
  if (max == 3 && countsArray.length == 2) return 'Full House'
  if (max == 3 && countsArray.length != 2) return 'Trips'
  if (max == 2 && countsArray.length == 3) return '2 Pair'
  if (max == 2 && countsArray.length != 3) return '1 Pair'
  if (max == 1) return 'High Card'
}

function determineFiveCardStrength(v, s) {
  const parity = detectParity(v)
  const hasFlush = detectFlush(s)
  const hasStraight = detectStraight(v)
  if (hasFlush && hasStraight) return { name: 'Straight Flush', sortValue: 9 }
  if (parity == 'Quads') return { name: 'Quads', sortValue: 8 }
  if (parity == 'Full House') return { name: 'Full House', sortValue: 7 }
  if (hasFlush) return { name: 'Flush', sortValue: 6 }
  if (hasStraight) return { name: 'Straight', sortValue: 5 }
  if (parity == 'Trips') return { name: 'Trips', sortValue: 4 }
  if (parity == '2 Pair') return { name: '2 Pair', sortValue: 3 }
  if (parity == '1 Pair') return { name: '1 Pair', sortValue: 2 }
  if (parity == 'High Card') return { name: 'High Card', sortValue: 1 }
}

function getOrderedValues(cards) {
  return reverse(sortBy((cards.map(card => numFromValue(card[0]))), []))
}

function getOrderedSuits(cards) {
  return reverse(sortBy((cards.map(card => numFromSuit(card[1]))), []))
}

function determineStrength(combo, board) {
  const v = getOrderedValues([...cardsFromCombo(combo), ...board])
  const s = getOrderedSuits([...cardsFromCombo(combo), ...board])
  let best = { name: null, sortValue: -Infinity }

  if (v.length == 5) {
    best = determineFiveCardStrength(v, s)
  }

  if (v.length == 6) {
    for (let i = 0; i < 6; i++) {
      const vFiltered = v.filter((_, k) => (k !== i))
      const sFiltered = s.filter((_, k) => (k !== i))
      const candidate = determineFiveCardStrength(vFiltered, sFiltered)
      best = candidate.sortValue > best.sortValue ? candidate : best
    }
  }

  if (v.length == 7) {
    for (let i = 0; i < 6; i++) {
      for (let j = i + 1; j < 7; j++) {
        const vFiltered = v.filter((_, k) => (k !== i && k !== j))
        const sFiltered = s.filter((_, k) => (k !== i && k !== j))
        const candidate = determineFiveCardStrength(vFiltered, sFiltered)
        best = candidate.sortValue > best.sortValue ? candidate : best
      }
    }
  }

  return best.name
}

function determineDetail(combo, board, strength) {
  if (strength != '1 Pair' && strength != 'High Card') {
    return null
  }

  const cV = getOrderedValues(cardsFromCombo(combo))
  const bV = getOrderedValues(board)

  if (strength == '1 Pair' && cV[0] != cV[1]) {
    if (bV.includes(cV[0])) return values[14 - cV[0]]
    if (bV.includes(cV[1])) return values[14 - cV[1]]
  }

  if (strength == '1 Pair' && cV[0] == cV[1]) {
    const pair = (index) => values[index] + values[index]
    const pairAbove = (bVIndex) => pair(13 - bV[bVIndex])
    const pairBelow = (bVIndex) => pair(15 - bV[bVIndex])
    if (cV[0] > bV[0] && bV[0] == 13) return 'AA'
    if (cV[0] > bV[0] && bV[0] != 13) return `AA-${pairAbove(0)}`
    if (cV[0] > bV[1] && bV[0] == bV[1] + 2) return pairBelow(0)
    if (cV[0] > bV[1] && bV[0] != bV[1] + 2) return `${pairBelow(0)}-${pairAbove(1)}`
    if (cV[0] > bV[2] && bV[1] == bV[2] + 2) return pairBelow(1)
    if (cV[0] > bV[2] && bV[1] != bV[2] + 2) return `${pairBelow(1)}-${pairAbove(2)}`
    if (bV.length == 3 && bV[2] != 3) return `${pairBelow(2)}-22`
    if (bV.length == 3 && bV[2] == 3) return '22'
    if (cV[0] > bV[3] && bV[2] == bV[3] + 2) return pairBelow(2)
    if (cV[0] > bV[3] && bV[2] != bV[3] + 2) return `${pairBelow(2)}-${pairAbove(3)}`
    if (bV.length == 4 && bV[3] != 3) return `${pairBelow(3)}-22`
    if (bV.length == 4 && bV[3] == 3) return '22'
    if (cV[0] > bV[4] && bV[3] == bV[4] + 2) return pairBelow(3)
    if (cV[0] > bV[4] && bV[3] != bV[4] + 2) return `${pairBelow(3)}-${pairAbove(4)}`
    if (bV.length == 5 && bV[4] != 3) return `${pairBelow(4)}-22`
    if (bV.length == 5 && bV[4] == 3) return '22'
  }

  if (strength == 'High Card') {
    const allValues = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
    const remainingValues = allValues.filter(value => !bV.includes(value))
    const kickerIndex = remainingValues.indexOf(Math.max(cV[0], cV[1]))
    if (kickerIndex <= 2) return values[14 - cV[0]]
    if (kickerIndex >= 3) return `${remainingValues[3]}-`
  }
}

function determineDraw(combo, board, strength) {
  const v = getOrderedValues([...cardsFromCombo(combo), ...board])
  const s = getOrderedSuits([...cardsFromCombo(combo), ...board])

  return {
    flush: detectFlushDraw(s, strength),
    straight: detectStraightDraw(v, strength)
  }
}

function categorizeCombo(combo, board) {
  const strength = determineStrength(combo, board)
  const detail = determineDetail(combo, board, strength)
  const draw = determineDraw(combo, board, strength)
  return { strength, detail, draw }
}

function detailSortValue(combo, board, strength) {
  if (strength != '1 Pair' && strength != 'High Card') return null
  const cV = getOrderedValues(cardsFromCombo(combo))
  const bV = getOrderedValues(board)
  if (strength == '1 Pair' && bV.includes(cV[0])) return cV[0]
  if (strength == '1 Pair' && bV.includes(cV[1])) return cV[1]
  return cV[0]
}

function determinePreflopStrength(combo) {
  const v = getOrderedValues(cardsFromCombo(combo))
  if (v[0] == v[1]) return 'pair'
  return 'high card'
}

function determinePreflopDraw(combo) {
  const v = getOrderedValues(cardsFromCombo(combo))
  const s = getOrderedSuits(cardsFromCombo(combo))
  let result = { flush: 'offsuit', straight: 'not con.' }
  if (s[0] == s[1]) result.flush = 'suited'
  if (v[0] == v[1] + 1) result.straight = 'connected'
  if (v[0] == v[1] + 2) result.straight = 'gapped'
  return result
}

function categorizePreflopCombo(combo) {
  const strength = determinePreflopStrength(combo)
  const draw = determinePreflopDraw(combo)
  return { strength, draw }
}