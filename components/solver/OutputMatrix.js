import { combos, numFromSuit, numFromValue, suits, values } from '@/lib/cards'
import MatrixHeaderCell from '../editor/MatrixHeaderCell'
import { frequencyColor, outputColor } from '@/lib/colors'

export default function OutputMatrix({ frequencies, actions, toCall, potBeforeCall, strategies, street, board, cellWidth = 15 }) {
  const blockWidth = 4 * cellWidth
  const matrixWidth = 13 * blockWidth + 12 + 1
  const headlineWidth = cellWidth >= 12 ? 40 : cellWidth >= 8 ? 34 : 22
  const suitArrayWidth = 14

  const n = street > 0 ? street + 2 : 0

  function cellStyle(v1, v2, s1, s2) {
    const c1 = v1 + s1
    const c2 = v2 + s2

    if (c1 === c2) return { background: '#181818' }
    if (board.slice(0, n).includes(c1)) return { background: '#121212' }
    if (board.slice(0, n).includes(c2)) return { background: '#121212' }

    const isTopRight = numFromValue(v1) > numFromValue(v2) || (numFromValue(v1) === numFromValue(v2) && numFromSuit(s1) > numFromSuit(s2))
    const combo = isTopRight ? c1 + c2 : c2 + c1

    if (!isTopRight) {
      return {
        background: '#181818'
      }
    }
    if (frequencies[combos.indexOf(combo)] === 0) {
      return {
        background: frequencyColor(0)
      }
    }
    return {
      background: outputColor(actions, toCall, potBeforeCall, strategies[combos.indexOf(combo)]),
    }
  }

  return (
    <div
      className='grid mb-3'
      style={{
        width: `${matrixWidth + headlineWidth}px`,
        height: `${matrixWidth + headlineWidth}px`,
        gridTemplateColumns: `${headlineWidth}px 1fr`,
        gridTemplateRows: `${headlineWidth}px 1fr`,
      }}
    >
      <div className='border'></div>
      <div className='flex'>
        {values.map(value => (
          <MatrixHeaderCell
            key={'top-value' + value}
            value={value}
            position='top'
            setHovered={() => {}}
            blockWidth={blockWidth}
            headlineWidth={headlineWidth}
            suitArrayWidth={suitArrayWidth}
          />
        ))}
      </div>
      <div className='flex flex-col'>
        {values.map(value => (
          <MatrixHeaderCell
            key={'left-value' + value}
            value={value}
            position='left'
            setHovered={() => {}}
            blockWidth={blockWidth}
            headlineWidth={headlineWidth}
            suitArrayWidth={suitArrayWidth}
          />
        ))}
      </div>
      <div
        className='grid gap-[1px] bg-[#222] border-b border-r'
        style={{
          width: `${matrixWidth}px`,
          height: `${matrixWidth}px`,
          gridTemplateColumns: `repeat(13, ${blockWidth}px)`,
        }}
      >
        {values.map(v1 => (
          values.map(v2 => (
            <div
              key={'block' + v1 + v2}
              className='grid'
              style={{
                width: `${blockWidth}px`,
                height: `${blockWidth}px`,
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
    </div>
  )
}