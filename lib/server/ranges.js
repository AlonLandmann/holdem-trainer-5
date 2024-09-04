import { Buffer } from 'buffer'
import { cloneDeep } from 'lodash'
import { combos } from '../shared/cards'
import { spotInfo } from './spots'

function actionToClient(action) {
  const arr = action.split('-')
  const type = arr[0]

  switch (type) {
    case 'fold': return { type, p: Number(arr[1]) }
    case 'call': return { type, p: Number(arr[1]) }
    case 'check': return { type, p: Number(arr[1]) }
    case 'bet': return { type, size: Number(arr[1]), p: Number(arr[2]) }
    case 'raise': return { type, size: Number(arr[1]), p: Number(arr[2]) }
    case 'flop': return { type, cards: arr.slice(1) }
    case 'flop': return { type, cards: arr.slice(1) }
    case 'flop': return { type, cards: arr.slice(1) }
  }
}

function actionToStorage(action) {
  switch (action.type) {
    case 'fold': return `fold-${action.p}`
    case 'call': return `call-${action.p}`
    case 'check': return `check-${action.p}`
    case 'bet': return `bet-${action.size}-${action.p}`
    case 'raise': return `raise-${action.size}-${action.p}`
    case 'flop': return `flop-${cards[0]}-${cards[1]}-${cards[2]}`
    case 'flop': return `turn-${cards[0]}`
    case 'flop': return `river-${cards[0]}`
  }
}

function optionToClient(option) {
  const arr = option.split('-')
  const type = arr[0]

  switch (type) {
    case 'fold': return { type }
    case 'call': return { type }
    case 'check': return { type }
    case 'bet': return { type, size: Number(arr[1]) }
    case 'raise': return { type, size: Number(arr[1]) }
  }
}

function optionToStorage(option) {
  switch (option.type) {
    case 'fold': return `fold`
    case 'call': return `call`
    case 'check': return `check`
    case 'bet': return `bet-${action.size}`
    case 'raise': return `raise-${action.size}`
  }
}

function matrixToClient(buffer, nrOptions) {
  const matrix = []
  let offset = 0

  for (let i = 0; i < combos.length; i++) {
    const frequency = buffer.readFloatBE(offset)
    const strategy = []
    offset += 4

    for (let j = 0; j < nrOptions; j++) {
      strategy.push(Math.round(1000 * buffer.readFloatBE(offset)) / 1000)
      offset += 4
    }

    matrix.push({ combo: combos[i], frequency, strategy })
  }

  return matrix
}

function matrixToStorage(matrix) {
  const bufferArray = []

  matrix.forEach(({ frequency, strategy }) => {
    const freqBuffer = Buffer.alloc(4)
    freqBuffer.writeFloatBE(Math.round(1000 * frequency) / 1000, 0)
    bufferArray.push(freqBuffer)

    strategy.forEach(p => {
      const probBuffer = Buffer.alloc(4)
      probBuffer.writeFloatBE(p, 0)
      bufferArray.push(probBuffer)
    })
  })

  return Buffer.concat(bufferArray)
}

export const defaultMatrixBuffer = matrixToStorage(combos.map(combo => ({
  combo,
  frequency: 1,
  strategy: [0, 1]
})))

export function toClientFormat(range) {
  let copy = cloneDeep(range)
  copy.history = range.history.map(a => actionToClient(a))
  copy.options = range.options.map(a => optionToClient(a))
  copy.matrix = matrixToClient(range.matrix, copy.options.length)
  copy.spot = spotInfo(copy.stacks, copy.history)
  return copy
}

export function toStorageFormat(range) {
  let copy = cloneDeep(range)
  copy.history = range.history.map(a => actionToStorage(a))
  copy.options = range.options.map(o => optionToStorage(o))
  copy.matrix = matrixToStorage(range.matrix)
  delete copy.spot
  return copy
}
