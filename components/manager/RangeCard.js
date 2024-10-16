import Button from '@/components/_ui/Button'
import MatrixDisplay from '@/components/manager/MatrixDisplay'
import RangeHistory from '@/components/manager/RangeHistory'
import RangeLegend from '@/components/manager/RangeLegend'
import RangeName from '@/components/manager/RangeName'
import RangeUiButtons from '@/components/manager/RangeUiButtons'
import { useLoadingQueue } from '@/hooks/useLoadingQueue'

export default function RangeCard({ range, selectedRanges, setSelectedRanges, folderLength }) {
  const [loadingQueue, setLoadingQueue] = useLoadingQueue()

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

  return (
    <div
      className='relative bg-neutral-900 p-2 rounded'
      draggable
      onDragStart={handleDragStart}
    >
      <RangeName range={range} />
      <RangeHistory range={range} />
      <div>{range.complexity.toFixed(3)}</div>
      <div className='flex gap-1'>
        <MatrixDisplay range={range} />
        <RangeUiButtons
          range={range}
          folderLength={folderLength}
        />
      </div>
      <div className='w-[418px] flex items-start justify-between gap-5'>
        <RangeLegend range={range} />
        <div className='flex items-center gap-1 py-1'>
          <Button
            theme='secondary'
            utilClasses='py-3 px-4 rounded-sm'
            icon={selectedRanges.includes(range.id) ? 'check-square' : 'square'}
            text='Select'
            onClick={handleSelect}
            useQueue
          />
          <Button
            theme='nice'
            utilClasses='py-3 px-4 rounded-sm font-normal'
            icon='crosshair'
            text='Train Now'
            onClick={() => { window.location = `/app/trainer?ids=${JSON.stringify([range.id])}` }}
          />
        </div>
      </div>
    </div>
  )
}