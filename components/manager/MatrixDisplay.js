import { frequencyColor, strategyColor } from '@/lib/colors'
import { numFromSuit, numFromValue, suits, values } from '@/lib/cards'

const CELLWIDTH = 8

export default function MatrixDisplay({ range }) {
  const cellWidth = CELLWIDTH
  const blockWidth = 4 * cellWidth
  const matrixWidth = 13 * blockWidth + 2

  const maxFrequency = Math.max(...range.matrix.map(c => c.frequency))

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

    if (isTopRight) {
      return {
        background: strategyColor(range, strategy),
      }
    } else {
      return {
        background: frequencyColor(frequency / maxFrequency),
      }
    }
  }

  return (
    <div
      className='border'
      style={{
        width: `${matrixWidth}px`,
        height: `${matrixWidth}px`,
        display: 'grid',
        gridTemplateColumns: `repeat(13, ${blockWidth}px)`,
        background: '#222',
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
                  key={'cell' + v1 + v2 + s1 + s2}
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