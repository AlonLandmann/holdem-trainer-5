import Button from '@/components/_ui/Button'
import Input from '@/components/_ui/Input'
import FolderPlaceholder from '@/components/manager/FolderPlaceholder'
import RangeCard from '@/components/manager/RangeCard'
import { useUser } from '@/hooks/useUser'
import { selectedForTraining } from '@/lib/display'
import handleManagerRequest from '@/lib/managerRequests'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function FolderContent({ selectedFolder }) {
  const [user, setUser] = useUser()
  const [renameInView, setRenameInView] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState(selectedFolder.name)
  const [selectedRanges, setSelectedRanges] = useState([])

  useEffect(() => {
    setRenaming(false)
    setRenameValue(selectedFolder.name)
  }, [selectedFolder])

  async function handleAddRange() {
    await handleManagerRequest(`/api/ranges/add?folderId=${selectedFolder.id}`, 'POST', setUser)
  }

  async function handleRenameFolder() {
    if (renameValue.length < 2 || renameValue.length > 30) {
      toast.error('Folder names should be between 2 and 30 characters long.')
    } else {
      await handleManagerRequest(`/api/folders/rename?folderId=${selectedFolder.id}`, 'PATCH', setUser, {
        name: renameValue
      })
    }
  }

  async function handleTrainSelected() {
    window.location = `/app/trainer?ids=${JSON.stringify(selectedRanges)}`
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
        <div className='p-3 h-full overflow-y-auto flex flex-wrap gap-x-4 gap-y-6'>
          {selectedFolder.ranges.map((range, i) => (
            <div key={'range' + range.id}>
              <RangeCard
                range={range}
                selectedRanges={selectedRanges}
                setSelectedRanges={setSelectedRanges}
                folderLength={selectedFolder.ranges.length}
              />
            </div>
          ))}
        </div>
      }
      <div className='border-t p-3 text-neutral-600 flex justify-between gap-3'>
        <div className={selectedRanges.length ? 'text-neutral-300' : ''}>
          {selectedForTraining(selectedRanges.length)}
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