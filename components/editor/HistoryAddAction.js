import Button from '@/components/_ui/Button'
import Input from '@/components/_ui/Input'
import { positions } from '@/lib/shared/spots'
import { produce } from 'immer'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function HistoryAddAction({ spot, setRange, adjustDraftToNewHistory }) {
  const [size, setSize] = useState('')

  function handleAddAction(type) {
    let action = { type, p: spot.p }

    if (['bet', 'raise'].includes(type)) {
      if (!size || isNaN(Number(size))) {
        return toast.error('Please enter a valid number.')
      }

      if (Number(size) < spot.min) {
        return toast.error(`Size must be at least ${spot.min} bb.`)
      }

      if (Number(size) > spot.max) {
        return toast.error(`Size can be at most ${spot.max} bb.`)
      }

      action.size = Number(size)
    }

    setRange(produce(draft => {
      draft.history.push(action)
      adjustDraftToNewHistory(draft)
    }))

    setSize('')
  }

  return (
    <div className='flex justify-center gap-1'>
      <div className='self-center px-3 text-sm text-neutral-400 lowercase'>
        {positions[spot.p]}
      </div>
      {spot.options.includes('fold') &&
        <Button
          theme='secondary'
          utilClasses='px-3 py-0'
          text='fold'
          onClick={() => { handleAddAction('fold') }}
        />
      }
      {spot.options.includes('call') &&
        <Button
          theme='secondary'
          utilClasses='px-3 py-0'
          text='call'
          onClick={() => { handleAddAction('call') }}
        />
      }
      {spot.options.includes('check') &&
        <Button
          theme='secondary'
          utilClasses='px-3 py-0'
          text='check'
          onClick={() => { handleAddAction('check') }}
        />
      }
      {spot.options.includes('bet') &&
        <>
          <Input
            theme='editor'
            utilClasses='spinner-less min-w-20'
            type='number'
            min={spot.min}
            max={spot.max}
            placeholder={`${spot.min} - ${spot.max}`}
            value={size}
            onChange={e => setSize(e.target.value)}
          />
          <Button
            theme='secondary'
            utilClasses='px-3 py-0'
            text='bet'
            onClick={() => { handleAddAction('bet') }}
          />
        </>
      }
      {spot.options.includes('raise') &&
        <>
          <Input
            theme='editor'
            utilClasses='spinner-less min-w-20'
            type='number'
            min={spot.min}
            max={spot.max}
            placeholder={`${spot.min} - ${spot.max}`}
            value={size}
            onChange={e => setSize(e.target.value)}
          />
          <Button
            theme='secondary'
            utilClasses='px-3 py-0'
            text='raise'
            onClick={() => { handleAddAction('raise') }}
          />
        </>
      }
    </div>
  )
}