import Button from '@/components/_common_/Button'
import SidebarFolder from './SidebarFolder'
import handleManagerRequest from '@/lib/client/managerRequests'

export default function Sidebar({ user }) {
  async function handleAddFolder() {
    await handleManagerRequest('/api/folders/add', 'POST')
  }
  
  return (
    <div className='bg-neutral-900 border-r w-56 flex flex-col'>
      <div className='border-b p-3 flex justify-between items-center'>
        <h1 className='text-neutral-600'>
          Manager
        </h1>
        <Button
          theme='tertiary'
          utilClasses='text-neutral-500 hover:text-neutral-300'
          icon='plus-lg'
          onClick={handleAddFolder}
          useQueue
        />
      </div>
      <div className='flex flex-col'>
        {user.folders.map(folder => (
          <SidebarFolder
            key={'folder' + folder.id}
            folder={folder}
          />
        ))}
      </div>
      <div className='border-t mt-auto p-3 flex justify-between items-center'>
        <span className='text-neutral-600'>
          Total # {user.nrRanges} / 40
        </span>
        <Button
          theme='tertiary'
          utilClasses='text-neutral-500 hover:text-neutral-300'
          icon='arrow-up-right'
          onClick={() => window.open('/pricing', '_blank')}
        />
      </div>
    </div>
  )
}