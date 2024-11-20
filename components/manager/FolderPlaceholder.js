import Button from '@/components/_ui/Button';
import toast from 'react-hot-toast';

export default function FolderPlaceholder({ selectedFolder }) {
  async function handleAddRange() {
    const res = await fetch(`/api/manager/add-range?folderId=${selectedFolder.id}`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    });

    const json = await res.json();

    if (json.success) {
      window.location.reload();
    } else {
      toast.error(json.message || 'An unexpected error occurred.');
    }
  }

  async function handleDeleteFolder() {
    const res = await fetch(`/api/manager/delete-folder?folderId=${selectedFolder.id}&folderIndex=${selectedFolder.index}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    });

    const json = await res.json();

    if (json.success) {
      window.location.reload();
    } else {
      toast.error(json.message || 'An unexpected error occurred.');
    }
  }

  return (
    <div className='grow p-4 flex flex-col justify-center items-center'>
      <div className='text-neutral-700 text-7xl mb-3'>
        <i className='bi bi-inbox-fill'></i>
      </div>
      <h1 className='text-xl font-medium mb-2'>
        No ranges yet
      </h1>
      <p className='text-neutral-500 mb-7 text-center'>
        You can add new ranges or delete this folder.
      </p>
      <div className='flex gap-2'>
        <Button
          theme='primary'
          utilClasses='py-3 px-4'
          icon='plus-lg'
          text='Add Range'
          onClick={handleAddRange}
          useQueue
        />
        <Button
          theme='secondary'
          utilClasses='py-3 px-4'
          icon='trash3'
          text='Delete Folder'
          onClick={handleDeleteFolder}
          useQueue
        />
      </div>
    </div>
  )
}