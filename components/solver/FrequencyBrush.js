import Button from '@/components/_ui/Button'
import Input from '@/components/_ui/Input'
import { combos } from '@/lib/cards'
import { produce } from 'immer'
import { useState } from 'react'
import FrequencySlider from './FrequencySlider'

export default function FrequencyBrush({ player, board, selected, setSelected, setFrequencies }) {
  const [frequency, setFrequency] = useState(500);

  function handleApplyBrush() {
    setFrequencies(produce(draft => {
      for (let i = 0; i < 1326; i++) {
        if (board.includes[combos[i].slice(0, 2)] || board.includes(combos[i].slice(2, 4))) {
          draft[player][i] = 0;
        } else if (selected.includes(combos[i])) {
          draft[player][i] = frequency;
        }
      }
    }))
  }

  return (
    <div className='border rounded py-3 px-4 flex flex-col text-neutral-300'>
      <div className='grid items-center mb-2' style={{ gridTemplateColumns: '100px 1fr auto' }}>
        <div>
          Frequency
        </div>
        <FrequencySlider
          frequency={frequency}
          setFrequency={setFrequency}
        />
        <Input
          theme='editor'
          utilClasses='w-28'
          type='number'
          min={0}
          max={1000}
          value={frequency}
          onChange={(e) => { setFrequency(e.target.value) }}
        />
      </div>
      <div className='grid grid-cols-2 gap-1 mb-2'>
        <Button
          theme='secondary'
          utilClasses='py-3 px-4'
          text='select all'
          onClick={() => { setSelected(combos) }}
        />
        <Button
          theme='secondary'
          utilClasses='py-3 px-4'
          text='clear selection'
          onClick={() => { setSelected([]) }}
        />
      </div>
      <Button
        theme='secondary'
        utilClasses='w-full py-3 px-4 justify-center'
        text='apply brush'
        icon='brush'
        onClick={handleApplyBrush}
      />
    </div>
  )
}