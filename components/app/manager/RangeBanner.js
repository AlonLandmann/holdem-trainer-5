import Button from '@/components/_common_/Button'
import Input from '@/components/_common_/Input'
import { useLoadingQueue } from '@/hooks/useLoadingQueue'
import { useUser } from '@/hooks/useUser'
import handleManagerRequest from '@/lib/client/managerRequests'
import { useEffect, useState } from 'react'
import MatrixDisplay from './MatrixDisplay'

export default function RangeBanner({ range, target, setTarget, selectedRanges, setSelectedRanges }) {
  const [user, setUser] = useUser()
  const [loadingQueue, setLoadingQueue] = useLoadingQueue()
  const [renameInView, setRenameInView] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState(range.name)

  useEffect(() => {
    setRenaming(false)
    setRenameValue(range.name)
  }, [range])

  async function handleRename() {
    await handleManagerRequest(`/api/ranges/rename?rangeId=${range.id}`, 'PATCH', setUser, {
      name: renameValue
    })
  }

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
      className='relative flex p-4 gap-6 border'
      draggable
      onDragStart={handleDragStart}
    >
      <div>
        <MatrixDisplay range={range} />
      </div>
      <div className='grow grid grid-cols-1 lg:grid-cols-2 gap-2'>
        <div className='flex flex-col'>
          <div
            className='flex items-center gap-3 z-40'
            onMouseEnter={() => setRenameInView(true)}
            onMouseLeave={() => setRenameInView(false)}
          >
            {!renaming &&
              <>
                <h1 className='text-lg'>
                  {range.name}
                </h1>
                <Button
                  theme='tertiary'
                  utilClasses={`transition ${renameInView ? 'opacity-100' : 'opacity-0'}`}
                  icon='input-cursor'
                  onClick={async () => setRenaming(true)}
                  useQueue
                />
              </>
            }
            {renaming &&
              <>
                <Input
                  theme='rename'
                  utilClasses='text-lg'
                  value={renameValue}
                  onChange={e => setRenameValue(e.target.value)}
                />
                <Button
                  theme='tertiary'
                  utilClasses='text-sm'
                  icon='x-lg'
                  onClick={async () => { setRenaming(false); setRenameValue(range.name) }}
                  useQueue
                />
                <Button
                  theme='tertiary'
                  icon='check2'
                  onClick={handleRename}
                  useQueue
                />
              </>
            }
          </div>
          <div className='text-neutral-600 mb-auto flex gap-2 z-40'>
            {range.history.map((action, i) => (
              <div key={'action' + i}>
                {action.cards
                  ? <div>{action.cards.join(' ')}</div>
                  : action.size
                    ? action.size
                    : action.type[0].toUpperCase()}
              </div>
            ))}
            <div>
              -
            </div>
          </div>
          <div className='text-neutral-600 z-40'>
            {JSON.stringify(range.options)}
          </div>
        </div>
        <div className='hidden lg:flex text-7xl text-neutral-800 justify-center items-center'>
          <i className='bi bi-graph-up-arrow'></i>
        </div>
      </div>
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
      <div
        className='absolute left-0 top-0 z-10 h-1/5 w-full'
        onDragOver={(e) => { handleDragOver(e, range.index) }}
      >

      </div>
      <div
        className='absolute left-0 bottom-0 z-10 h-1/5 w-full'
        onDragOver={(e) => { handleDragOver(e, range.index + 1) }}
      >

      </div>
    </div>
  )
}