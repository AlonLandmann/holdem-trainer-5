import { useState } from 'react'
import OutputMatrix from './OutputMatrix'

export default function PlayerOutput({ player, frequencies, street, board, output }) {
  const [key, setKey] = useState(Object.keys(output)[0])

  return (
    <div>
      <OutputMatrix
        frequencies={frequencies[player]}
        actions={output[key].actions}
        toCall={output[key].toCall}
        potBeforeCall={output[key].potBeforeCall}
        strategies={output[key].strategies}
        street={street}
        board={board}
        cellWidth={9}
      />
    </div>
  )
}