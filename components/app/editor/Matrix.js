import { suits, values } from '@/lib/server/cards'

export default function Matrix({ range }) {
  const cellWidth = 10
  const blockWidth = 4 * cellWidth

  return (
    <div
      style={{
        display: 'grid',
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
                    backgroundColor: '#121212',
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