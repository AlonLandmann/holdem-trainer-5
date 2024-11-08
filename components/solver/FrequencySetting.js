import { useState } from 'react'
import FrequencyMatrix from './FrequencyMatrix'
import { positions } from '@/lib/spots'
import FrequencyBrush from './FrequencyBrush'

export default function FrequencySetting({ player, board, street, frequencies, setFrequencies }) {
  const [selected, setSelected] = useState([])
  const [hovered, setHovered] = useState([])

  return (
    <div className='flex flex-col'>
      <h3 className='mb-2 text-neutral-400 bg-neutral-800 py-2 px-3 rounded-sm bg-opacity-40'>
        {positions[player]}
      </h3>
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