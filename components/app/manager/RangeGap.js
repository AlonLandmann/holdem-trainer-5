import { useLoadingQueue } from '@/hooks/useLoadingQueue'
import { useUser } from '@/hooks/useUser'
import handleManagerRequest from '@/lib/client/managerRequests'
import { useState } from 'react'

export default function RangeGap({ index, target, setTarget }) {
  const [user, setUser] = useUser()
  const [loadingQueue, setLoadingQueue] = useLoadingQueue()
  const [loading, setLoading] = useState(false)

  function handleDragOver(event) {
    if (!loadingQueue) {
      const data = JSON.parse(event.dataTransfer.getData('text/plain'))

      if (data.type === 'range' && !loadingQueue) {
        event.preventDefault()
      }
    }
  }

  async function handleDrop(event) {
    if (!loadingQueue) {
      const data = JSON.parse(event.dataTransfer.getData('text/plain'))

      if (data.type === 'range') {
        if (target === data.origin || target === data.origin + 1) {
          setTarget(null)
        } else {
          setLoading(true)
          setLoadingQueue(true)

          await handleManagerRequest('/api/ranges/move-within', 'PATCH', setUser, {
            origin: data.origin,
            originId: data.originId,
            target
          })

          setLoading(false)
          setLoadingQueue(false)
          setTarget(null)
        }
      }
    }
  }

  return (
    <div
      className={`relative ${target === index ? 'h-8' : 'h-4'}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {loading &&
        <div className='absolute w-full h-full left-0 flex justify-center items-center'>
          <span className='inline-block animate-pulse'>
            ·
          </span>
          <span className='inline-block animate-pulse [animation-delay:0.2s]'>
            ·
          </span>
          <span className='inline-block animate-pulse [animation-delay:1s]'>
            ·
          </span>
        </div>
      }
    </div>
  )
}