import { useState } from 'react'
import FrequencyMatrix from './FrequencyMatrix'
import { positions } from '@/lib/spots'

export default function FrequencySetting({ player, board, frequencies, setFrequencies }) {
  const [selected, setSelected] = useState([])
  const [hovered, setHovered] = useState([])

  return (
    <div>
      <h1 className='px-2 mb-3'>
        {positions[player]} Frequencies
      </h1>
      <FrequencyMatrix
        frequencies={frequencies[player]}
        board={board}
        selected={selected}
        setSelected={setSelected}
        hovered={hovered}
        setHovered={setHovered}
        cellWidth={9}
      />
    </div>
  )
}