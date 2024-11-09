import { useState } from 'react'
import OutputMatrix from './OutputMatrix'

export default function PlayerOutput({ player, street, board, output }) {
  const [key, setKey] = useState(Object.keys(output)[0])

  return (
    <div>
      <OutputMatrix
        actions={output[key].actions}
        toCallNumbers={output[key].toCallNumbers}
        strategies={output[key].strategies}
        street={street}
        board={board}
        cellWidth={9}
      />
    </div>
  )
}