import Button from '@/components/_ui/Button'
import Input from '@/components/_ui/Input'
import BrushOption from '@/components/editor/BrushOption'
import BrushSlider from '@/components/editor/BrushSlider'
import { combos, isValid } from '@/lib/cards'
import { evenSplit } from '@/lib/rounding'
import { produce } from 'immer'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
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
      <h1 className='pb-1 text-neutral-400'>
        Brush
      </h1>
      <div className='pl-1 flex flex-col gap-[6px]'>
        <div className='flex gap-2'>
          <div>
            Frequency
          </div>
          <Input
            theme='editor'
            type='number'
            min={0}
            max={1000}
            value={frequency}
            onChange={(e) => { setFrequency(e.target.value) }}
          />
        </div>
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