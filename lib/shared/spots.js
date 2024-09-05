export const positions = ['SB', 'BB', 'UTG', 'HJ', 'CO', 'BTN']
export const streets = ['preflop', 'flop', 'turn', 'river']

function updateStacks(stacksAtRound, committedAtRound) {
  for (let i = 0; i < 6; i++) {
    stacksAtRound[i] -= committedAtRound[i]
    committedAtRound[i] = 0
  }
}

function incrementPosition(p, hasFolded, isAllIn) {
  for (let i = 1; i < 6; i++) {
    const np = (p + i) % 6
    if (!hasFolded[np] && !isAllIn[np]) {
      return np
    }
  }
}

function countTrue(array) {
  return array.filter(Boolean).length
}

function incrementStreet(street) {
  return streets[streets.indexOf(street) + 1]
}

function minSize(p, stacksAtRound, stake, minRaise) {
  return Math.min(stacksAtRound[p], stake + minRaise)
}

function maxSize(p, stacksAtRound, hasFolded) {
  let maxAmongOthers = 0
  
  for (let i = 0; i < 6; i++) {
    if (i !== p && !hasFolded[i]) {
      maxAmongOthers = Math.max(maxAmongOthers, stacksAtRound[i])
    }
  }

  return Math.min(stacksAtRound[p], maxAmongOthers)
}

export function spotInfo(stacks, history) {
  let spot = {
    history,
    p: 2,
    lastActions: Array(6).fill(null),
    street: 'preflop',
    board: [],
    hasFolded: Array(6).fill(false),
    stacksAtRound: [...stacks],
    committedAtRound: Array(6).fill(0),
    blinds: [null, null],
    pot: 0,
  }

  let isAllIn = Array(6).fill(false)
  let hasActed = Array(6).fill(false)
  let minRaise = 1

  spot.committedAtRound[0] = Math.min(spot.stacksAtRound[0], 0.5)
  spot.blinds[0] = { type: 'bet', size: Math.min(spot.stacksAtRound[0], 0.5), p: 0 }
  spot.pot += Math.min(spot.stacksAtRound[0], 0.5)
  isAllIn[0] = spot.stacksAtRound[0] <= 0.5
  spot.lastActions[0] = isAllIn[0] ? 'all in' : 'sb'

  spot.committedAtRound[1] = Math.min(spot.stacksAtRound[1], 1)
  spot.blinds[1] = { type: 'bet', size: Math.min(spot.stacksAtRound[1], 1), p: 1 }
  spot.pot += Math.min(spot.stacksAtRound[1], 1)
  isAllIn[1] = spot.stacksAtRound[1] <= 1
  spot.lastActions[1] = isAllIn[1] ? 'all in' : 'bb'

  for (let i = 0; i < history.length; i++) {
    const { type, p, size, cards } = history[i]
    const stake = Math.max(...spot.committedAtRound)

    if (type == 'fold') {
      spot.hasFolded[p] = true
    }

    if (type == 'call') {
      spot.pot -= spot.committedAtRound[p]
      spot.committedAtRound[p] = Math.min(spot.stacksAtRound[p], stake)
      spot.pot += spot.committedAtRound[p]
    }

    if (type == 'bet') {
      minRaise = Math.max(size, minRaise)
      spot.committedAtRound[p] = size
      spot.pot += size
    }

    if (type == 'raise') {
      minRaise = Math.max(size - stake, minRaise)
      spot.pot -= spot.committedAtRound[p]
      spot.committedAtRound[p] = size
      spot.pot += spot.committedAtRound[p]
    }

    if (streets.includes(type)) {
      hasActed = Array(6).fill(false)
      minRaise = 1
      spot.street = type
      spot.board = spot.board.concat(cards)
      updateStacks(spot.stacksAtRound, spot.committedAtRound)
      spot.lastActions = spot.lastActions.map(a => (a == 'all in') ? a : null)
      spot.p = incrementPosition(5, spot.hasFolded, isAllIn)
    } else {
      isAllIn[p] = spot.committedAtRound[p] >= spot.stacksAtRound[p]
      hasActed[p] = true
      spot.lastActions[p] = isAllIn[p] ? 'all in' : type
      spot.p = incrementPosition(p, spot.hasFolded, isAllIn)
    }
  }

  for (let i = 0; i < history.length; i++) {
    if (history[i].p == spot.p) {
      spot.linkIndex = i
    }
  }

  const stake = Math.max(...spot.committedAtRound)
  const committed = spot.committedAtRound[spot.p]

  if (countTrue(spot.hasFolded) >= 5) {
    spot.state = 'takedown'
  } else if (countTrue(spot.hasFolded) + countTrue(isAllIn) >= 5 && committed < stake) {
    spot.state = 'fold / call'
    spot.options = ['fold', 'call']
    spot.toCall = stake - committed
  } else if (countTrue(spot.hasFolded) + countTrue(isAllIn) >= 5) {
    spot.state = 'showdown'
  } else if (committed < stake && spot.stacksAtRound[spot.p] > stake) {
    spot.state = 'fold / call / raise'
    spot.options = ['fold', 'call', 'raise']
    spot.toCall = stake - committed
    spot.min = minSize(spot.p, spot.stacksAtRound, stake, minRaise)
    spot.max = maxSize(spot.p, spot.stacksAtRound, spot.hasFolded)
  } else if (committed < stake) {
    spot.state = 'fold / call'
    spot.options = ['fold', 'call']
    spot.toCall = stake - committed
  } else if (!hasActed[spot.p]) {
    spot.state = 'check / bet'
    spot.options = ['check', 'bet']
    spot.min = minSize(spot.p, spot.stacksAtRound, stake, minRaise)
    spot.max = maxSize(spot.p, spot.stacksAtRound, spot.hasFolded)
  } else if (spot.street == 'river') {
    spot.state = 'showdown'
  } else {
    spot.state = incrementStreet(spot.street)
  }

  return spot
}
