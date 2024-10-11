import Button from '@/components/_ui/Button'
import { useUser } from '@/hooks/useUser'
import handleManagerRequest from '@/lib/managerRequests'
import { isEqual } from 'lodash'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export default function Toolbar({ allRanges, range, setRange, past, setPast, future, setFuture, error }) {
  const router = useRouter()
  const [user, setUser] = useUser()
  const referenceRange = useMemo(() => range, [range.id])

  function handleRangeChange(event) {
    setRange(allRanges.find(r => String(r.id) === event.target.value))
    router.push(`/app/editor/${event.target.value}`, undefined, { shallow: true });
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
    if (error) return null
    if (!range.spot.options) return toast.error('The current history does not imply a player choice.')
    await handleManagerRequest('/api/ranges/edit', 'PUT', setUser, range)
  }

  function handleTrain() {
    if (isEqual(range, referenceRange) || confirm('You have unsaved changes, which will be lost if you start training. Do you want to proceed anyway?')) {
      window.location = `/app/trainer?ids=${JSON.stringify([range.id])}`
    }
  }

  return (
    <div className='border-b p-3 flex gap-4 h-[49px]'>
      <select
        name='range'
        className='appearance-none mr-auto'
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
        icon='crosshair'
        onClick={handleTrain}
        useQueue
      />
    </div>
  )
}