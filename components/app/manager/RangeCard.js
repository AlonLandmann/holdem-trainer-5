import Button from '@/components/_common_/Button'
import Input from '@/components/_common_/Input'
import { useLoadingQueue } from '@/hooks/useLoadingQueue'
import { useUser } from '@/hooks/useUser'
import handleManagerRequest from '@/lib/client/managerRequests'
import MatrixDisplay from './MatrixDisplay'
import RangeName from './RangeName'
import RangeHistory from './RangeHistory'
import RangeLegend from './RangeLegend'

export default function RangeCard({ range, target, setTarget, selectedRanges, setSelectedRanges }) {
  const [user, setUser] = useUser()
  const [loadingQueue, setLoadingQueue] = useLoadingQueue()

  async function handleDelete() {
    if (confirm(`Are you sure you want to delete the range '${range.name}'? This action cannot be undone.`)) {
      await handleManagerRequest(`/api/ranges/delete?rangeId=${range.id}&rangeIndex=${range.index}&folderId=${range.folderId}`, 'DELETE', setUser)
    }
  }

  async function handleDuplicate() {
    await handleManagerRequest('/api/ranges/duplicate', 'POST', setUser, range)
  }

  async function handleSelect() {
    setSelectedRanges(prev => {
      if (prev.includes(range.id)) {
        return prev.filter(id => id !== range.id)
      } else {
        return prev.concat([range.id])
      }
    })
  }

  function handleDragStart(event) {
    if (!loadingQueue) {
      event.dataTransfer.setData('text/plain', JSON.stringify({
        type: 'range',
        origin: range.index,
        originId: range.id,
        originFolderId: range.folderId,
      }))
    }
  }

  function handleDragOver(event, index) {
    if (!loadingQueue) {
      const data = JSON.parse(event.dataTransfer.getData('text/plain'))

      if (data.type === 'range' && target !== index) {
        setTarget(index)
      }
    }
  }

  return (
    <div
      className='relative'
      draggable
      onDragStart={handleDragStart}
    >
      <RangeName range={range} />
      <RangeHistory range={range} />
      <MatrixDisplay range={range} />
      <RangeLegend range={range} />
      <div className='flex flex-col gap-1 pr-1 text-sm z-40'>
        <Button
          theme='tertiary'
          icon='trash3'
          onClick={handleDelete}
          useQueue
        />
        <Button
          theme='tertiary'
          icon='pen'
          onClick={() => { window.location = `/app/editor/${range.id}` }}
        />
        <Button
          theme='tertiary'
          icon='copy'
          onClick={handleDuplicate}
          useQueue
        />
        <Button
          theme='tertiary'
          utilClasses='mt-auto text-xs'
          icon={selectedRanges.includes(range.id) ? 'check-square' : 'square'}
          onClick={handleSelect}
          useQueue
        />
        <Button
          theme='tertiary'
          icon='crosshair'
          onClick={() => { window.location = `/app/trainer?ids=${JSON.stringify([range.id])}` }}
        />
      </div>
    </div>
  )
}

{/* <div
        className='absolute left-0 top-0 z-10 h-1/5 w-full'
        onDragOver={(e) => { handleDragOver(e, range.index) }}
      >

      </div>
      <div
        className='absolute left-0 bottom-0 z-10 h-1/5 w-full'
        onDragOver={(e) => { handleDragOver(e, range.index + 1) }}
      >

      </div> */}