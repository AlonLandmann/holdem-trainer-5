import Button from '@/components/_common_/Button'
import { useLoadingQueue } from '@/hooks/useLoadingQueue'
import MatrixDisplay from './MatrixDisplay'
import RangeName from './RangeName'
import RangeHistory from './RangeHistory'
import RangeLegend from './RangeLegend'
import RangeUiButtons from './RangeUiButtons'

export default function RangeCard({ range, target, setTarget, selectedRanges, setSelectedRanges }) {
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

  // function handleDragStart(event) {
  //   if (!loadingQueue) {
  //     event.dataTransfer.setData('text/plain', JSON.stringify({
  //       type: 'range',
  //       origin: range.index,
  //       originId: range.id,
  //       originFolderId: range.folderId,
  //     }))
  //   }
  // }

  // function handleDragOver(event, index) {
  //   if (!loadingQueue) {
  //     const data = JSON.parse(event.dataTransfer.getData('text/plain'))

  //     if (data.type === 'range' && target !== index) {
  //       setTarget(index)
  //     }
  //   }
  // }

  return (
    <div
      className='relative'
    >
      <RangeName range={range} />
      <RangeHistory range={range} />
      <div className='flex gap-1'>
        <MatrixDisplay range={range} />
        <RangeUiButtons range={range} />
      </div>
      <div className='w-[418px] flex justify-between gap-1'>
        <RangeLegend range={range} />
        <div className='flex items-center gap-1'>
          <Button
            theme='secondary'
            utilClasses='rounded-none'
            icon={selectedRanges.includes(range.id) ? 'check-square' : 'square'}
            text='Select'
            onClick={handleSelect}
            useQueue
          />
          <Button
            theme='primary'
            utilClasses='rounded-none'
            icon='crosshair'
            text='Train Now'
            onClick={() => { window.location = `/app/trainer?ids=${JSON.stringify([range.id])}` }}
          />
        </div>
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