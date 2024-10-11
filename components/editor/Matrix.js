import { combos, includingValue, numFromSuit, numFromValue, sameValue, suits, values } from '@/lib/cards'
import { frequencyColor, strategyColor } from '@/lib/colors'
import { isNull } from 'lodash'

export default function Matrix({ range, selected, setSelected, hovered, setHovered, optionHover }) {
  const cellWidth = 15
  const blockWidth = 4 * cellWidth
  const matrixWidth = 13 * blockWidth + 12 + 1
  const headlineWidth = 38 + 2
  const suitArrayWidth = 14

  const maxFrequency = Math.max(...range.matrix.map(c => (
    isNull(optionHover) ? c.frequency : c.frequency * c.strategy[optionHover])
  ))

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
        borderTop: isSelected ? `${cellWidth * 0.4}px solid #ff000044` : 'none'
      }
    } else {
      return {
        background: frequencyColor((isNull(optionHover) ? frequency : frequency * strategy[optionHover]) / maxFrequency),
        opacity: isHovered ? 1 : 0.05,
        borderTop: isSelected ? `${cellWidth}px solid #ff000044` : 'none'
      }
    }
  }

  function handleCellClick(event, v1, v2, s1, s2) {
    if (!range.spot.options) return null

    const c1 = v1 + s1
    const c2 = v2 + s2

    if (c1 == c2) return null
    if (range.spot.board.includes(c1)) return null
    if (range.spot.board.includes(c2)) return null

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
          <div
            key={'top-value' + value}
            className='flex flex-col border-t border-r border-b'
            onMouseLeave={() => { setHovered([]) }}
            onMouseEnter={() => { setHovered(includingValue(value)) }}
            style={{
              width: `${blockWidth + 1}px`,
              height: `${headlineWidth}px`
            }}
          >
            <div className='grow flex justify-center items-center text-sm text-neutral-400'>
              {value}
            </div>
            <div
              className='grid grid-cols-4 justify-items-center items-center text-neutral-800 leading-none'
              style={{ height: `${suitArrayWidth}px` }}
            >
              <div className='text-[10px]'>
                <i className='bi bi-suit-spade-fill'></i>
              </div>
              <div className='text-[9px]'>
                <i className='bi bi-suit-heart-fill'></i>
              </div>
              <div className='text-[10px]'>
                <i className='bi bi-suit-diamond-fill'></i>
              </div>
              <div className='text-[10px]'>
                <i className='bi bi-suit-club-fill'></i>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex flex-col'>
        {values.map(value => (
          <div
            key={'top-value' + value}
            className='flex border-r border-b border-l'
            style={{
              width: `${headlineWidth}px`,
              height: `${blockWidth + 1}px`,
            }}
          >

            <div
              className='grow flex justify-center items-center text-sm text-neutral-400'
            >
              {value}
            </div>
            <div
              className='grid grid-rows-4 justify-items-center items-center text-neutral-800 leading-none'
              style={{ width: `${suitArrayWidth}px` }}
            >
              <div className='text-[10px]'>
                <i className='bi bi-suit-spade-fill'></i>
              </div>
              <div className='text-[9px]'>
                <i className='bi bi-suit-heart-fill'></i>
              </div>
              <div className='text-[10px]'>
                <i className='bi bi-suit-diamond-fill'></i>
              </div>
              <div className='text-[10px]'>
                <i className='bi bi-suit-club-fill'></i>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          width: `${matrixWidth}px`,
          height: `${matrixWidth}px`,
          borderBottom: '1px solid rgb(38, 38, 38)',
          borderRight: '1px solid rgb(38, 38, 38)',
          display: 'grid',
          gridTemplateColumns: `repeat(13, ${blockWidth}px)`,
          gap: '1px',
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
                    onClick={e => handleCellClick(e, v1, v2, s1, s2)}
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