import Button from '@/components/_common_/Button'
import Input from '@/components/_common_/Input'
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
    <div className='flex items-center gap-2 mt-2'>
      <div className='mr-auto'>
        {positions[spot.p]}
      </div>
      {spot.options.includes('fold') &&
        <Button
          theme='secondary'
          text='fold'
          onClick={() => { handleAddAction('fold') }}
        />
      }
      {spot.options.includes('call') &&
        <Button
          theme='secondary'
          text='call'
          onClick={() => { handleAddAction('call') }}
        />
      }
      {spot.options.includes('check') &&
        <Button
          theme='secondary'
          text='check'
          onClick={() => { handleAddAction('check') }}
        />
      }
      {spot.options.includes('bet') &&
        <>
          <Input
            theme='editor'
            utilClasses='spinner-less'
            type='number'
            min={spot.min}
            max={spot.max}
            placeholder={`${spot.min} - ${spot.max}`}
            value={size}
            onChange={e => setSize(e.target.value)}
          />
          <Button
            theme='secondary'
            text='bet'
            onClick={() => { handleAddAction('bet') }}
          />
        </>
      }
      {spot.options.includes('raise') &&
        <>
          <Input
            theme='editor'
            type='number'
            min={spot.min}
            max={spot.max}
            placeholder={`${spot.min} - ${spot.max}`}
            value={size}
            onChange={e => setSize(e.target.value)}
          />
          <Button
            theme='secondary'
            text='raise'
            onClick={() => { handleAddAction('raise') }}
          />
        </>
      }
    </div>
  )
}