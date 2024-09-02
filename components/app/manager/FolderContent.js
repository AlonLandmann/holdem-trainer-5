import Button from '@/components/_common_/Button'
import Input from '@/components/_common_/Input'
import handleManagerRequest from '@/lib/client/managerRequests'
import { useEffect, useState } from 'react'

export default function FolderContent({ selectedFolder }) {
  const [renameInView, setRenameInView] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState(selectedFolder.name)

  async function handleAddRange() {
    await handleManagerRequest(`/api/ranges/add?folderId=${selectedFolder.id}`, 'POST')
  }

  async function handleRenameFolder() {
    await handleManagerRequest(`/api/folders/rename?folderId=${selectedFolder.id}`, 'PATCH', {
      name: renameValue
    })
  }

  useEffect(() => {
    setRenaming(false)
    setRenameValue(selectedFolder.name)
  }, [selectedFolder])

  return (
    <div className='grow bg-neutral-900'>
      <div className='flex justify-between gap-3 border-b p-3'>
        <div
          className='grow flex items-center gap-3'
          onMouseEnter={() => setRenameInView(true)}
          onMouseLeave={() => setRenameInView(false)}
        >
          {!renaming &&
            <>
              <h1>
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
      <div className='py-2 px-3'>
        {selectedFolder.ranges.map(range => (
          <div key={range.id}>
            {range.name}
          </div>
        ))}
      </div>
    </div>
  )
}