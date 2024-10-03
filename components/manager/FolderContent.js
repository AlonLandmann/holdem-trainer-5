import Button from '@/components/_ui/Button'
import Input from '@/components/_ui/Input'
import handleManagerRequest from '@/lib/managerRequests'
import { useEffect, useState } from 'react'
import FolderPlaceholder from './FolderPlaceholder'
import { useUser } from '@/hooks/useUser'
import RangeCard from './RangeCard'
import RangeGap from './RangeGap'
import { useLoadingQueue } from '@/hooks/useLoadingQueue'

export default function FolderContent({ selectedFolder }) {
  const [user, setUser] = useUser()
  const [loadingQueue, setLoadingQueue] = useLoadingQueue()
  const [renameInView, setRenameInView] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState(selectedFolder.name)
  const [target, setTarget] = useState(null)
  const [selectedRanges, setSelectedRanges] = useState([])

  useEffect(() => {
    setRenaming(false)
    setRenameValue(selectedFolder.name)
  }, [selectedFolder])

  async function handleAddRange() {
    await handleManagerRequest(`/api/ranges/add?folderId=${selectedFolder.id}`, 'POST', setUser)
  }

  async function handleRenameFolder() {
    await handleManagerRequest(`/api/folders/rename?folderId=${selectedFolder.id}`, 'PATCH', setUser, {
      name: renameValue
    })
  }

  async function handleTrainSelected() {
    window.location = `/app/trainer?ids=${JSON.stringify(selectedRanges)}`
  }

  function handleDragLeave(event) {
    if (!loadingQueue) {
      const isLeavingParent = !event.currentTarget.contains(event.relatedTarget)

      if (isLeavingParent) {
        setTarget(null)
      }
    }
  }

  return (
    <div className='grow flex flex-col max-h-screen'>
      <div className='flex justify-between gap-3 border-b p-3'>
        <div
          className='grow flex items-center gap-3'
          onMouseEnter={() => setRenameInView(true)}
          onMouseLeave={() => setRenameInView(false)}
        >
          {!renaming &&
            <>
              <h1 className='text-neutral-500'>
                {selectedFolder.name}
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
                utilClasses='text-neutral-500'
                value={renameValue}
                onChange={e => setRenameValue(e.target.value)}
              />
              <Button
                theme='tertiary'
                utilClasses='text-sm'
                icon='x-lg'
                onClick={async () => { setRenaming(false); setRenameValue(selectedFolder.name) }}
                useQueue
              />
              <Button
                theme='tertiary'
                icon='check2'
                onClick={handleRenameFolder}
                useQueue
              />
            </>
          }
        </div>
        <Button
          theme='tertiary'
          utilClasses='text-neutral-500 hover:text-neutral-300'
          icon='plus-lg'
          onClick={handleAddRange}
          useQueue
        />
      </div>
      {selectedFolder.ranges.length === 0 &&
        <FolderPlaceholder
          selectedFolder={selectedFolder}
        />
      }
      {selectedFolder.ranges.length > 0 &&
        <div
          className='p-5 h-full overflow-y-auto flex flex-wrap gap-x-8 gap-y-10'
          onDragLeave={handleDragLeave}
        >
          {/* <RangeGap
            index={0}
            target={target}
            setTarget={setTarget}
          /> */}
          {selectedFolder.ranges.map((range, i) => (
            <div key={'range' + range.id}>
              <RangeCard
                range={range}
                target={target}
                setTarget={setTarget}
                selectedRanges={selectedRanges}
                setSelectedRanges={setSelectedRanges}
              />
              {/* <RangeGap
                index={i + 1}
                target={target}
                setTarget={setTarget}
              /> */}
            </div>
          ))}
        </div>
      }
      <div className='border-t p-3 text-neutral-600 flex justify-between gap-3'>
        <div>
          {selectedRanges.length ? ('# ' + selectedRanges.length) : 'No'} {selectedRanges.length > 1 ? 'ranges' : 'range'} selected for training
        </div>
        <Button
          theme='tertiary'
          utilClasses='text-neutral-500 hover:text-neutral-300'
          icon='crosshair'
          onClick={handleTrainSelected}
          useQueue
        />
      </div>
    </div>
  )
}