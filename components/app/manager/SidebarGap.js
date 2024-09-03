import { useLoadingQueue } from '@/hooks/useLoadingQueue'
import handleManagerRequest from '@/lib/client/managerRequests'
import { useState } from 'react'

export default function SidebarGap({ index, target, setTarget }) {
  const [loadingQueue, setLoadingQueue] = useLoadingQueue()
  const [loading, setLoading] = useState(false)

  function handleDragOver(event) {
    if (!loadingQueue) {
      const data = JSON.parse(event.dataTransfer.getData('text/plain'))

      if (data.type === 'folder' && !loadingQueue) {
        event.preventDefault()
      }
    }
  }

  async function handleDrop(event) {
    if (!loadingQueue) {
      const data = JSON.parse(event.dataTransfer.getData('text/plain'))

      if (data.type === 'folder') {
        if (target === data.origin || target === data.origin + 1) {
          setTarget(null)
        } else {
          setLoading(true)
          setLoadingQueue(true)

          await handleManagerRequest('/api/folders/move', 'PATCH', {
            origin: data.origin,
            originId: data.originId,
            target
          })

          setLoading(false)
          setLoadingQueue(false)
        }
      }
    }
  }

  return (
    <div
      className={`relative ${target === index ? 'h-4 border-b' : ''}`}
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