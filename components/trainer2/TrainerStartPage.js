import { useState } from 'react'
import Button from '../_ui/Button'

export default function TrainerStartPage({ user, setPage }) {
  const [nrRanges, setNrRanges] = useState(20)

  return (
    <div className='grow'>
      <div className='border-b h-[49px] flex items-center px-3'>
        <h1 className='text-neutral-600 mr-auto'>
          Trainer
        </h1>
        <span className='mr-4'>
          14 selected
        </span>
        <select
          name='nrCombos'
          className='appearance-none py-2 px-3 mr-1'
          value={String(nrRanges)}
          onChange={e => { setNrRanges(Number(e.target.value)) }}
        >
          <option value='20'>20 Combos</option>
          <option value='50'>50 Combos</option>
          <option value='100'>100 Combos</option>
        </select>
        <Button
          theme='nice'
          utilClasses='h-[39px] px-3 gap-1 rounded-sm'
          icon='crosshair'
          text='Start Training'
        />
      </div>
    </div>
  )
}