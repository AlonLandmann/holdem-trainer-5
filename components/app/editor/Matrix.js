import { frequencyColor, strategyColor } from '@/lib/client/colors'
import { numFromSuit, numFromValue, suits, values } from '@/lib/shared/cards'

export default function Matrix({ range, hovered = [], selected = [] }) {
  const cellWidth = 15
  const blockWidth = 4 * cellWidth
  const matrixWidth = 13 * blockWidth + 14

  function cellStyle(v1, v2, s1, s2) {
    if (!range.spot.options) return { background: '#181818' }

    const c1 = v1 + s1
    const c2 = v2 + s2

    if (c1 === c2) return { background: '#181818' }
    if (range.spot.board.includes(c1)) return { background: '#121212' }
    if (range.spot.board.includes(c2)) return { background: '#121212' }

    const isTopRight = numFromValue(v1) > numFromValue(v2) || (numFromValue(v1) === numFromValue(v2) && numFromSuit(s1) > numFromSuit(s2))
    const combo = isTopRight ? c1 + c2 : c2 + c1
    const { frequency, strategy } = range.matrix.find(c => c.combo === combo)

    if (frequency === 0) return { background: '#181818' }

    const isSelected = selected.includes(combo)
    const isHovered = hovered.length === 0 || hovered.includes(combo)

    if (isTopRight) {
      return {
        background: strategyColor(range, strategy),
        opacity: isHovered ? 1 : 0.05,
        borderTop: isSelected ? `${cellWidth * 0.4}px solid #ff000044` :'none'
      }
    } else {
      return {
        background: frequencyColor(frequency),
        opacity: isHovered ? 1 : 0.05,
        borderTop: isSelected ? `${cellWidth}px solid #ff000044` :'none'
      }
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        width: `${matrixWidth}px`,
        border: '1px solid rgb(38, 38, 38)',
        gridTemplateColumns: `repeat(13, ${blockWidth}px)`,
        gap: '1px',
      }}
    >
      {values.map(v1 => (
        values.map(v2 => (
          <div
            key={'block' + v1 + v2}
            style={{
              width: `${blockWidth}px`,
              height: `${blockWidth}px`,
              display: 'grid',
              gridTemplateColumns: `repeat(4, ${cellWidth}px)`,
            }}
          >
            {suits.map(s1 => (
              suits.map(s2 => (
                <div
                  key={'cell' + v1 + s1 + v2 + s2}
                  style={{
                    width: `${cellWidth}px`,
                    height: `${cellWidth}px`,
                    ...cellStyle(v1, v2, s1, s2),
                  }}
                >

                </div>
              ))
            ))}
          </div>
        ))
      ))}
    </div>
  )
}