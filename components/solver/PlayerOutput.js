import { useState } from 'react'
import OutputMatrix from './OutputMatrix'
import { positions } from '@/lib/spots'

export default function PlayerOutput({ player, frequencies, street, board, output }) {
  const [key, setKey] = useState(Object.keys(output)[0])

  return (
    <div className='flex flex-col'>
      <div className='flex gap-1 mb-2'>
        <h3 className='text-neutral-400 bg-neutral-800 py-2 px-3 rounded-sm bg-opacity-40 min-w-28'>
          {positions[player]}
        </h3>
        <select
          name='key'
          className='grow appearance-none'
          value={key}
          onChange={e => { setKey(e.target.value) }}
        >
          {Object.keys(output).map(k => (
            <option value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>
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