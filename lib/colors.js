const SATURATION = 55
const LIGHTNESS = 50
const FOLD_HUE = 210
const CHECK_OR_CALL_HUE = 130
const MIN_RAISE_HUE = 65
const MAX_RAISE_HUE = -40
const MIN_FREQUENCY_LIGHTNESS = 20
const MAX_FREQUENCY_LIGHTNESS = 44

function hslToRgb(hsl) {
  const [h, s, l] = hsl
  const hue = h / 360
  const saturation = s / 100
  const lightness = l / 100
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const x = chroma * (1 - Math.abs((hue * 6) % 2 - 1))
  const m = lightness - chroma / 2

  let r, g, b
  if (0 <= hue && hue < 1/6) {
      r = chroma
      g = x
      b = 0
  } else if (1/6 <= hue && hue < 1/3) {
      r = x
      g = chroma
      b = 0
  } else if (1/3 <= hue && hue < 1/2) {
      r = 0
      g = chroma
      b = x
  } else if (1/2 <= hue && hue < 2/3) {
      r = 0
      g = x
      b = chroma
  } else if (2/3 <= hue && hue < 5/6) {
      r = x
      g = 0
      b = chroma
  } else {
      r = chroma
      g = 0
      b = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return [r, g, b]
}

function hueFromSize(sizeInPots) {
  const towardsMax = 1 - Math.exp(-sizeInPots * 0.5)
  const distance = MIN_RAISE_HUE - MAX_RAISE_HUE
  return ((MIN_RAISE_HUE - distance * towardsMax) + 360) % 360
}

function optionHue(option, spot) {
  if (option.type == 'fold') return FOLD_HUE
  if (option.type == 'check' || option.type == 'call') return CHECK_OR_CALL_HUE
  return hueFromSize((option.size - (spot.toCall || 0)) / (spot.pot + (spot.toCall || 0)))
}

export function optionColor(option, spot) {
  return `hsl(${optionHue(option, spot)}, ${SATURATION}%, ${LIGHTNESS}%)`
}

export function strategyColor(range, strategy) {
  const hues = range.options.map(option => optionHue(option, range.spot))
  const rgbs = hues.map(hue => hslToRgb([hue, SATURATION, LIGHTNESS]))
  let mixed = [0, 0, 0]

  rgbs.forEach(([r, g, b], i) => {
    mixed[0] += r * r * strategy[i]
    mixed[1] += g * g * strategy[i]
    mixed[2] += b * b * strategy[i]
  })

  const [r, g, b] = mixed
  return `rgb(${Math.sqrt(r)}, ${Math.sqrt(g)}, ${Math.sqrt(b)})`
}

export function frequencyColor(frequency) {
  const distance = MAX_FREQUENCY_LIGHTNESS - MIN_FREQUENCY_LIGHTNESS
  const lightness = (MIN_FREQUENCY_LIGHTNESS + frequency * distance)
  return `hsl(0, 0%, ${lightness}%)`
}

export function outputColor(actions, toCall, potBeforeCall, strategy) {
  const hues = []

  for (let i = 0; i < actions.length; i++) {
    if (toCall > 0) {
      if (actions[i] == 0) {
        hues.push(FOLD_HUE)
      } else if (actions[i] == toCall) {
        hues.push(CHECK_OR_CALL_HUE)
      } else {
        hues.push(hueFromSize((actions[i] - toCall) / (potBeforeCall + toCall)))
      }
    } else if (toCall == 0) {
      if (actions[i] == 0) {
        hues.push(CHECK_OR_CALL_HUE)
      } else {
        hues.push(hueFromSize((actions[i] - toCall) / (potBeforeCall + toCall)))
      }
    }
  }

  const rgbs = hues.map(hue => hslToRgb([hue, SATURATION, LIGHTNESS]))
  let mixed = [0, 0, 0]

  rgbs.forEach(([r, g, b], i) => {
    mixed[0] += r * r * strategy[i]
    mixed[1] += g * g * strategy[i]
    mixed[2] += b * b * strategy[i]
  })

  const [r, g, b] = mixed
  return `rgb(${Math.sqrt(r)}, ${Math.sqrt(g)}, ${Math.sqrt(b)})`
}