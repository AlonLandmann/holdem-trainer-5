import { useLoadingQueue } from '@/hooks/useLoadingQueue'
import { useUser } from '@/hooks/useUser'
import handleManagerRequest from '@/lib/managerRequests'
import { useState } from 'react'
import LoadingDots from '../_ui/LoadingDots'

export default function SidebarGap({ index, target, setTarget }) {
  const [user, setUser] = useUser()
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

          await handleManagerRequest('/api/folders/move', 'PATCH', setUser, {
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
      className={`relative ${target === index ? 'h-4 border-b' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {loading &&
        <LoadingDots utilClasses='h-full items-center' />
      }
    </div>
  )
}