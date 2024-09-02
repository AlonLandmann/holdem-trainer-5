import handleManagerRequest from '@/lib/client/managerRequests'

export default function SidebarGap({ index, target, setTarget }) {
  function handleDragOver(event) {
    const data = JSON.parse(event.dataTransfer.getData('text/plain'))

    if (data.type === 'folder') {
      event.preventDefault()
    }
  }

  async function handleDrop(event) {
    const data = JSON.parse(event.dataTransfer.getData('text/plain'))

    if (data.type === 'folder') {
      setTarget(null)

      if (target !== data.origin && target !== data.origin + 1) {
        await handleManagerRequest('/api/folders/move', 'PATCH', {
          origin: data.origin,
          originId: data.originId,
          target
        })
      }
    }
  }

  return (
    <div
      className={target === index ? 'h-3 border-b' : ''}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      
    </div>
  )
}