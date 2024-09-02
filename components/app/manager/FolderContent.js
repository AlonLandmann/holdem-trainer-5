import Button from '@/components/_common_/Button'
import handleManagerRequest from '@/lib/client/managerRequests'
import { useState } from 'react'

export default function FolderContent({ selectedFolder }) {
  const [renameInView, setRenameInView] = useState(false)

  async function handleAddRange() {
    await handleManagerRequest(`/api/ranges/add?folderId=${selectedFolder.id}`, 'POST')
  }

  return (
    <div className='grow bg-neutral-900'>
      <div className='flex'>
        <div
          className='flex items-center'
          onMouseEnter={() => setRenameInView(true)}
          onMouseLeave={() => setRenameInView(false)}
        >
          <i className='bi bi-folder'></i>
          <h1>
            {selectedFolder.name}
          </h1>
          <Button
            theme='tertiary'
            utilClasses={renameInView ? '' : 'hidden'}
            icon='input-cursor'
          />
        </div>
        <Button
          theme='tertiary'
          icon='plus-lg'
          onClick={handleAddRange}
          useQueue
        />
      </div>
    </div>
  )
}