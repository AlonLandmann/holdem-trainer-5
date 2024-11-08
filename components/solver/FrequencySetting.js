import { useState } from 'react'
import FrequencyMatrix from './FrequencyMatrix'
import { positions } from '@/lib/spots'
import FrequencyBrush from './FrequencyBrush'

export default function FrequencySetting({ player, board, street, frequencies, setFrequencies }) {
  const [selected, setSelected] = useState([])
  const [hovered, setHovered] = useState([])

  return (
    <div className='flex flex-col gap-3'>
      <h1 className='px-2'>
        {positions[player]} Frequencies
      </h1>
      <FrequencyMatrix
        frequencies={frequencies[player]}
        board={board}
        street={street}
        selected={selected}
        setSelected={setSelected}
        hovered={hovered}
        setHovered={setHovered}
        cellWidth={9}
      />
      <FrequencyBrush
        player={player}
        board={board}
        selected={selected}
        setSelected={setSelected}
        setFrequencies={setFrequencies}
      />
    </div>
  )
}