import Button from '@/components/_ui/Button'
import Input from '@/components/_ui/Input'
import { combos, isValid } from '@/lib/cards'
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

    setSelected([]);
  }

  return (
    <div className='border rounded py-3 px-4 flex flex-col text-neutral-300'>
      <div className='flex items-center gap-14'>
          <div>
            Frequency
          </div>
          <Input
            theme='editor'
            utilClasses='grow'
            type='number'
            min={0}
            max={1000}
            value={frequency}
            onChange={(e) => { setFrequency(e.target.value) }}
          />
      </div>
      <FrequencySlider
        frequency={frequency}
        setFrequency={setFrequency}
      />
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