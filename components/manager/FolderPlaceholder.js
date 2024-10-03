import Button from '@/components/_ui/Button'
import { useUser } from '@/hooks/useUser'
import handleManagerRequest from '@/lib/client/managerRequests'

export default function FolderPlaceholder({ selectedFolder }) {
  const [user, setUser] = useUser()

  async function handleAddRange() {
    await handleManagerRequest(`/api/ranges/add?folderId=${selectedFolder.id}`, 'POST', setUser)
  }

  async function handleDeleteFolder() {
    await handleManagerRequest(`/api/folders/delete?folderId=${selectedFolder.id}&folderIndex=${selectedFolder.index}`, 'DELETE', setUser)
  }

  return (
    <div className='grow p-4 flex flex-col justify-center items-center'>
      <div className='text-neutral-700 text-7xl mb-3'>
        <i className='bi bi-inbox-fill'></i>
      </div>
      <h1 className='text-xl font-medium mb-2'>
        No ranges yet
      </h1>
      <p className='text-neutral-500 mb-7'>
        You can add new ranges or delete this folder.
      </p>
      <div className='flex gap-2'>
        <Button
          theme='primary'
          icon='plus-lg'
          text='Add Range'
          onClick={handleAddRange}
          useQueue
        />
        <Button
          theme='secondary'
          icon='trash3'
          text='Delete Folder'
          onClick={handleDeleteFolder}
          useQueue
        />
      </div>
    </div>
  )
}