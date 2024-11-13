import { useState } from 'react'
import OutputMatrix from './OutputMatrix'
import { positions } from '@/lib/spots'
import { combos } from '@/lib/cards'

export default function PlayerOutput({ player, frequencies, board, output }) {
  const [key, setKey] = useState(Object.keys(output)[0])

  const legendItems = []

  for (let i = 0; i < 1326; i++) {
    if (frequencies[player][i] > 0) {
      legendItems.push({
        combo: combos[i],
        strategy: output[key].strategies[i]
      })
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='flex gap-1 mb-2'>
        <h3 className='flex items-center text-neutral-400 bg-neutral-800 py-2 px-3 rounded-sm bg-opacity-40 min-w-28'>
          {positions[player]}
        </h3>
        <select
          name='key'
          className='grow appearance-none'
          value={key}
          onChange={e => { setKey(e.target.value) }}
        >
          {Object.keys(output).map(k => (
            <option key={k} value={k}>
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
        street={output[key].street}
        board={board}
        cellWidth={9}
      />
      <div className='text-sm text-neutral-500'>
        {legendItems.map(legendItem => (
          <div key={legendItem.combo} className='flex gap-2'>
            <div className='min-w-10'>
              {legendItem.combo}
            </div>
            <div>
              {output[key].actions.map((action, i) => (
                `${action}: ${legendItem.strategy[i].toFixed(3)}`
              )).join(' - ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}