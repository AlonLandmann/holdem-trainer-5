import { isEqual } from 'lodash'
import { sameSuitedness, sameValue } from '../shared/cards'
import { numFromValue } from '../shared/cards'

export function totalCombos(sessions) {
  let total = 0

  for (let i = 0; i < sessions.length; i++) {
    const units = sessions[i].trainingUnits

    for (let j = 0; j < units.length; j++) {
      total += units[j].total
    }
  }

  return total
}

export function totalScore(sessions) {
  let total = 0

  for (let i = 0; i < sessions.length; i++) {
    const units = sessions[i].trainingUnits

    for (let j = 0; j < units.length; j++) {
      total += units[j].score
    }
  }

  return total
}

// function isNeighbour(c1, c2) {
//   const v11 = numFromValue(c1[0])
//   const v12 = numFromValue(c1[2])
//   const v21 = numFromValue(c2[0])
//   const v22 = numFromValue(c2[2])

//   if (Math.abs(v11 - v21) > 1 || Math.abs(v12 - v22) > 1) {
//     return false
//   }

//   const p1 = Math.abs(v11 - v21) === 1
//   const p2 = Math.abs(v12 - v22) === 1

//   if ((p1 && !p2) || (!p1 && p2)) {
//     return 'horizontal'
//   }

//   if (p1 && p2) {
//     return 'diagonal'
//   }

//   return false
// }

// function samePairedness(c1, c2) {
//   const p1 = c1[0] === c1[2]
//   const p2 = c2[0] === c2[2]

//   return (p1 && p2) || (!p1 && !p2)
// }

// function connectionWeight(c1, c2) {
//   if (sameValue(c1, c2)) {
//     return sameSuitedness(c1, c2) ? 0.9 : 0.3
//   } else if (isNeighbour(c1, c2) === 'horizontal') {
//     return sameSuitedness(c1, c2) ? 0.6 : 0.15
//   } else if (isNeighbour(c1, c2) === 'diagonal' && !samePairedness(c1, c2)) {
//     return sameSuitedness(c1, c2) ? 0.4 : 0.08
//   } else if (isNeighbour(c1, c2) === 'diagonal' && samePairedness(c1, c2)) {
//     return 0.2
//   } else {
//     return 0.01
//   }
// }

export function computeComplexity(range) {
  // --- SLOW BUT BETTER --- //

  // let totalChangeScore = 0
  // let maximumChangeScore = 0
  // let nrCombos = 0

  // range.matrix.forEach(c1 => {
  //   if (c1.frequency > 0) {
  //     nrCombos++

  //     range.matrix.forEach(c2 => {
  //       if (c2.frequency > 0 && c1.combo !== c2.combo) {
  //         const w = connectionWeight(c1.combo, c2.combo)
  //         maximumChangeScore += w

  //         if (!isEqual(c1.strategy, c2.strategy)) {
  //           totalChangeScore += w
  //         }
  //       }
  //     })
  //   }
  // })

  // const nrFactor = Math.pow(nrCombos / 1326, 1 / 4)
  // const chaosFactor = totalChangeScore / maximumChangeScore
  
  // return nrFactor * chaosFactor
  
  // --- FAST BUT WORSE --- //
  
  let nrCombos = 0
  let uniqueStrategies = []

  range.matrix.forEach(c => {
    if (c.frequency > 0) {
      nrCombos += 1
      const stratCode = JSON.stringify(c.strategy)

      if (!uniqueStrategies.includes(stratCode)) {
        uniqueStrategies.push(stratCode)
      }
    }
  })

  const numberFactor = Math.pow(nrCombos / 1326, 1 / 4)
  const stratFactor = 1 - Math.exp(-0.5 * (uniqueStrategies.length - 1))

  console.log(`number factor: ${numberFactor}, stratFactor: ${stratFactor}, product: ${numberFactor * stratFactor}`)

  return numberFactor * stratFactor
}

export function averageRangeComplexity(user) {
  let total = 0

  for (let i = 0; i < user.folders.length; i++) {
    for (let j = 0; j < user.folders[i].ranges.length; j++) {
      total += user.folders[i].ranges[j].complexity
    }
  }

  return user.nrRanges ? (total / user.nrRanges).toFixed(2) : '-'
}

export function rank(user) {
  const score  = totalScore(user.trainingSessions)

  if (score >= 1000000) return 'Spade General'
  if (score >= 902500) return 'Spade Colonel'
  if (score >= 810000) return 'Spade Major'
  if (score >= 722500) return 'Spade Captain'
  if (score >= 640000) return 'Spade Lieutenant'
  if (score >= 562500) return 'Heart General'
  if (score >= 490000) return 'Heart Colonel'
  if (score >= 422500) return 'Heart Major'
  if (score >= 360000) return 'Heart Captain'
  if (score >= 302500) return 'Heart Lieutenant'
  if (score >= 250000) return 'Diamond General'
  if (score >= 202500) return 'Diamond Colonel'
  if (score >= 160000) return 'Diamond Major'
  if (score >= 122500) return 'Diamond Captain'
  if (score >= 90000) return 'Diamond Lieutenant'
  if (score >= 62500) return 'Club General'
  if (score >= 40000) return 'Club Colonel'
  if (score >= 22500) return 'Club Major'
  if (score >= 10000) return 'Club Captain'
  if (score >= 2500) return 'Club Lieutenant'

  return 'Recruit'
}