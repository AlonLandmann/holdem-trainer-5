import { useLoadingQueue } from '@/hooks/useLoadingQueue'
import { useUser } from '@/hooks/useUser'
import handleManagerRequest from '@/lib/client/managerRequests'
import { useState } from 'react'

export default function SidebarFolder({
  folder,
  isSelected,
  setSelectedFolder,
  target,
  setTarget,
}) {
  const [user, setUser] = useUser()
  const [loadingQueue, setLoadingQueue] = useLoadingQueue()
  const [loading, setLoading] = useState(false)
  const [isDropCandidate, setIsDropCandidate] = useState(false)

  function handleDragStart(event) {
    if (!loadingQueue) {
      event.dataTransfer.setData('text/plain', JSON.stringify({
        type: 'folder',
        origin: folder.index,
        originId: folder.id,
      }))
    }
  }

  function handleDragOver(event, index, rangesOnly = false) {
    if (!loadingQueue) {
      const data = JSON.parse(event.dataTransfer.getData('text/plain'))

      if (data.type === 'folder' && target !== index && !rangesOnly) {
        setTarget(index)
      }

      if (data.type === 'range' && data.originFolderId !== folder.id) {
        setIsDropCandidate(true)
        event.preventDefault()
      }
    }
  }

  function handleDragLeave(event) {
    if (!loadingQueue) {
      const data = JSON.parse(event.dataTransfer.getData('text/plain'))
      const isLeavingParent = !event.currentTarget.contains(event.relatedTarget)

      if (data.type === 'range' && isLeavingParent) {
        setIsDropCandidate(false)
      }
    }
  }

  async function handleDrop(event) {
    if (!loadingQueue) {
      const data = JSON.parse(event.dataTransfer.getData('text/plain'))

      if (data.type === 'range' && data.originFolderId !== folder.id) {
        setLoading(true)
        setLoadingQueue(true)

        await handleManagerRequest('/api/ranges/move-between', 'PATCH', setUser, {
          rangeId: data.originId,
          rangeIndex: data.origin,
          originFolderId: data.originFolderId,
          targetFolderId: folder.id,
          targetFolderLength: folder.ranges.length
        })

        setLoading(false)
        setLoadingQueue(false)
        setIsDropCandidate(false)
      }
    }
  }

  return (
    <div
      className={`
        relative p-3 pr-4 border-b text-neutral-500 text-sm overflow-ellipsis
        flex justify-between gap-3 cursor-pointer
        ${isSelected ? 'bg-neutral-800' : 'hover:text-neutral-300'}
        ${isDropCandidate ? 'bg-neutral-800' : ''}
      `}
      onClick={() => setSelectedFolder(folder)}
      draggable
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
    >
      <span className={`${isSelected ? 'text-neutral-200' : ''}`}>
        {folder.name}
      </span>
      <span className='font-mono'>
        {folder.ranges.length}
      </span>
      <div
        className='absolute left-0 top-0 z-10 h-1/3 w-full'
        onDragOver={(e) => { handleDragOver(e, folder.index) }}
        onDrop={handleDrop}
      >

      </div>
      <div
        className='absolute left-0 top-1/3 z-10 h-1/3 w-full'
        onDragOver={(e) => { handleDragOver(e, null, true) }}
        onDrop={handleDrop}
      >

      </div>
      <div
        className='absolute left-0 bottom-0 z-10 h-1/3 w-full'
        onDragOver={(e) => { handleDragOver(e, folder.index + 1) }}
        onDrop={handleDrop}
      >

      </div>
    </div>
  )
}