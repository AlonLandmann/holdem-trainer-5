import Button from '@/components/_common_/Button'
import Input from '@/components/_common_/Input'
import handleManagerRequest from '@/lib/client/managerRequests'
import { useEffect, useState } from 'react'
import FolderPlaceholder from './FolderPlaceholder'
import { useUser } from '@/hooks/useUser'
import RangeBanner from './RangeBanner'

export default function FolderContent({ selectedFolder }) {
  const [user, setUser] = useUser()
  const [renameInView, setRenameInView] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState(selectedFolder.name)

  async function handleAddRange() {
    await handleManagerRequest(`/api/ranges/add?folderId=${selectedFolder.id}`, 'POST', setUser)
  }

  async function handleRenameFolder() {
    await handleManagerRequest(`/api/folders/rename?folderId=${selectedFolder.id}`, 'PATCH', setUser, {
      name: renameValue
    })
  }

  useEffect(() => {
    setRenaming(false)
    setRenameValue(selectedFolder.name)
  }, [selectedFolder])

  return (
    <div className='grow bg-neutral-900 flex flex-col'>
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
                onClick={() => setRenaming(true)}
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
        <div className='p-3 flex flex-col gap-3 bg-neutral-950 h-full'>
          {selectedFolder.ranges.map(range => (
            <RangeBanner
              key={range.id}
              range={range}
            />
          ))}
        </div>
      }
    </div>
  )
}