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