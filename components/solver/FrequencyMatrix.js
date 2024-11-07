import { combos, numFromSuit, numFromValue, sameValue, suits, values } from '@/lib/cards'
import { frequencyColor } from '@/lib/colors'
import MatrixHeaderCell from '../editor/MatrixHeaderCell'

export default function FrequencyMatrix({ frequencies, board, selected, setSelected, hovered, setHovered, cellWidth = 15 }) {
  const blockWidth = 4 * cellWidth
  const matrixWidth = 13 * blockWidth + 12 + 1
  const headlineWidth = cellWidth >= 12 ? 40 : cellWidth >= 8 ? 34 : 22
  const suitArrayWidth = 14

  const maxFrequency = Math.max(...frequencies);

  function cellStyle(v1, v2, s1, s2) {
    const c1 = v1 + s1
    const c2 = v2 + s2

    if (c1 === c2) return { background: '#181818' }
    if (board.includes(c1)) return { background: '#121212' }
    if (board.includes(c2)) return { background: '#121212' }

    const isTopRight = numFromValue(v1) > numFromValue(v2) || (numFromValue(v1) === numFromValue(v2) && numFromSuit(s1) > numFromSuit(s2))
    const combo = isTopRight ? c1 + c2 : c2 + c1
    const frequency = frequencies[combos.indexOf(combo)]

    if (frequency === 0) return { background: '#181818' }

    const isSelected = selected.includes(combo)
    const isHovered = hovered.length === 0 || hovered.includes(combo)

    if (!isTopRight) {
      return {
        background: '#181818'
      }
    }
    return {
      background: frequencyColor(frequency / maxFrequency),
      opacity: isHovered ? 1 : 0.05,
      borderTop: isSelected ? `${cellWidth}px solid #ff000044` : 'none'
    }
  }

  function handleCellClick(event, v1, v2, s1, s2) {
    const c1 = v1 + s1
    const c2 = v2 + s2

    if (c1 === c2) return null
    if (board.includes(c1)) return null
    if (board.includes(c2)) return null

    const isTopRight = numFromValue(v1) > numFromValue(v2) || (numFromValue(v1) === numFromValue(v2) && numFromSuit(s1) > numFromSuit(s2))
    const combo = isTopRight ? c1 + c2 : c2 + c1
    const ctrl = event.ctrlKey || event.metaKey
    const shift = event.shiftKey
    const alt = event.altKey
    const isSelected = selected.includes(combo)

    setSelected(prev => {
      const withSuited = prev.concat(combos.filter(c => sameValue(c, combo) && c[1] === c[3]))
      const withoutSuited = prev.filter(c => !sameValue(c, combo) || c[1] !== c[3])
      const withValue = prev.concat(combos.filter(c => sameValue(c, combo)))
      const withoutValue = prev.filter(c => !sameValue(c, combo))
      const withCombo = prev.concat([combo])
      const withoutCombo = prev.filter(c => c !== combo)

      if (shift && ctrl) return withoutValue
      if (ctrl) return withValue
      if (shift && alt) return withoutSuited
      if (alt) return withSuited
      return isSelected ? withoutCombo : withCombo
    })
  }

  return (
    <div
      className='grid'
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
            setHovered={setHovered}
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
            setHovered={setHovered}
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
                    onClick={e => handleCellClick(e, v1, v2, s1, s2)}
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