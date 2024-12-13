import Button from '@/components/_ui/Button'
import { isEqual } from 'lodash'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Confirm from '../_ui/Confirm'

export default function Toolbar({ allRanges, range, setRange, past, setPast, future, setFuture, error, setViewHotkeyInfo, settings }) {
  const router = useRouter()
  const [referenceRange, setReferenceRange] = useState(range)

  function handleRangeChange(event) {
    function executeRangeChange() {
      const newRange = allRanges.find(r => String(r.id) === event.target.value)
      setRange(newRange)
      setReferenceRange(newRange)
      router.push(`/app/editor/${event.target.value}`, undefined, { shallow: true })
      setPast([])
      setFuture([])
    }

    if (isEqual(range, referenceRange)) {
      executeRangeChange()
    } else {
      toast.dismiss()

      const toastId = toast.custom(
        <Confirm
          prompt='You have unsaved changes, which will be lost if you start training. Do you want to proceed anyway?'
          onCancel={async () => toast.remove(toastId)}
          onConfirm={async () => {
            executeRangeChange()
            toast.remove(toastId)
          }}
        />,
        {
          duration: Infinity,
        }
      )
    }
  }

  function handleUndo() {
    if (past.length > 0) {
      const previousState = past[past.length - 1]
      const newPast = past.slice(0, -1)
      setFuture((prev) => [range, ...prev])
      setRange(previousState)
      setPast(newPast)
    }
  }

  function handleRedo() {
    if (future.length > 0) {
      const nextState = future[0]
      const newFuture = future.slice(1)
      setPast((prev) => [...prev, range].slice(-50))
      setRange(nextState)
      setFuture(newFuture)
    }
  }

  async function handleSaveChanges() {
    if (error) {
      return;
    }

    if (!range.spot.options) {
      toast.error('Ranges can only be saved at a node where a player is making a decision.');
      return;
    }

    const res = await fetch('/api/editor/save-changes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(range),
    });

    const json = await res.json();

    if (json.success) {
      window.location.reload();
    } else {
      toast.error(json.message || 'An unexpected error occurred.');
    }
  }

  function handleTrain() {
    if (isEqual(range, referenceRange) || confirm('You have unsaved changes, which will be lost if you start training. Do you want to proceed anyway?')) {
      router.push(`/app/trainer?ids=${JSON.stringify([range.id])}`);
    }
  }

  return (
    <div className='border-b px-3 flex gap-4 h-[49px]'>
      <select
        name='range'
        className='appearance-none mr-auto self-center py-2 px-3 bg-neutral-800 text-neutral-300 border-none focus:border-none max-w-60'
        value={String(range.id)}
        onChange={handleRangeChange}
      >
        {allRanges.map(r => (
          <option
            key={'option' + r.id}
            disabled={r.id === range.id}
            value={String(r.id)}
          >
            {r.name}
          </option>
        ))}
      </select>
      <Button
        theme='tertiary'
        utilClasses='text-neutral-500 hover:text-neutral-300'
        icon='arrow-counterclockwise'
        disabled={past.length === 0}
        onClick={handleUndo}
      />
      <Button
        theme='tertiary'
        utilClasses='text-neutral-500 hover:text-neutral-300'
        icon='arrow-clockwise'
        disabled={future.length === 0}
        onClick={handleRedo}
      />
      <Button
        theme='tertiary'
        utilClasses='text-neutral-500 hover:text-neutral-300'
        icon='floppy2-fill'
        onClick={handleSaveChanges}
        useQueue
        disabled={isEqual(range, referenceRange) || error}
      />
      <Button
        theme='tertiary'
        utilClasses='text-neutral-500 hover:text-neutral-300'
        icon='alt'
        onClick={() => { setViewHotkeyInfo(true) }}
      />
      <Button
        theme='tertiary'
        utilClasses='text-neutral-500 hover:text-neutral-300'
        icon='crosshair'
        onClick={handleTrain}
        useQueue
      />
    </div>
  )
}