import { useLoadingQueue } from '@/hooks/useLoadingQueue'

export default function SidebarFolder({
  folder,
  isSelected,
  setSelectedFolder,
  target,
  setTarget,
}) {
  const [loadingQueue, setLoadingQueue] = useLoadingQueue()

  function handleDragStart(event) {
    if (!loadingQueue) {
      event.dataTransfer.setData('text/plain', JSON.stringify({
        type: 'folder',
        origin: folder.index,
        originId: folder.id,
      }))
    }
  }

  function handleDragOver(event, index) {
    if (!loadingQueue) {
      const data = JSON.parse(event.dataTransfer.getData('text/plain'))

      if (data.type === 'folder' && target !== index) {
        setTarget(index)
      }
    }
  }

  return (
    <div
      className={`
        relative p-3 pr-4 border-b text-neutral-500 text-sm overflow-ellipsis
        flex justify-between gap-3 cursor-pointer
        ${isSelected ? 'bg-neutral-800' : 'hover:text-neutral-300'}
      `}
      onClick={() => setSelectedFolder(folder)}
      draggable
      onDragStart={handleDragStart}
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
      >

      </div>
      <div
        className='absolute left-0 bottom-0 z-10 h-1/3 w-full'
        onDragOver={(e) => { handleDragOver(e, folder.index + 1) }}
      >

      </div>
    </div>
  )
}