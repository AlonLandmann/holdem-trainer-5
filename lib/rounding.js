export function evenSplit(n) {
  if (n <= 1) return ['100']
  const initialSplit = Math.round(1000 / n) / 10
  const diff = Math.round(10 * (100 - n * initialSplit)) / 10
  const result = [initialSplit + diff].concat(Array(n - 1).fill(initialSplit))
  return result.map(f => String(f))
}

export function rng() {
  return Math.ceil(Math.random() * 1000) / 10
}