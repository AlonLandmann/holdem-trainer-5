import Button from '@/components/_ui/Button'
import { useUser } from '@/hooks/useUser'
import handleManagerRequest from '@/lib/managerRequests'
import { isEqual } from 'lodash'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export default function Toolbar({ range, setRange, past, setPast, future, setFuture, error }) {
  const [user, setUser] = useUser()
  const referenceRange = useMemo(() => range, [])

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

    /// ALSO DEAL WITH LINKS HERE <---
  }

  /// ALLOW SWAPPING OF RANGES

  return (
    <div className='border-b p-3 flex gap-4 h-[49px]'>
      <h1 className='text-neutral-500 mr-auto'>
        {range.name}
      </h1>
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
    </div>
  )
}