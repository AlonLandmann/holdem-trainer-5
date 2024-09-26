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

export function computeComplexity(range) {
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

export function averageComplexity(user) {
  let total = 0

  for (let i = 0; i < user.folders.length; i++) {
    for (let j = 0; j < user.folders[i].ranges.length; j++) {
      total += user.folders[i].ranges[j].complexity
    }
  }

  return total / user.nrRanges
}