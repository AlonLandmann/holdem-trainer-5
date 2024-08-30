import Button from '@/components/_common_/Button'
import SidebarFolder from './SidebarFolder'

export default function Sidebar({ user }) {
  return (
    <div className='bg-neutral-900 border-r w-56'>
      <div className='border-b p-3 flex justify-between items-center'>
        <h1 className='text-neutral-600'>
          Manager
        </h1>
        <Button
          theme='tertiary'
          utilClasses='text-neutral-500 hover:text-neutral-300'
          icon='plus-lg'
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
    </div>
  )
}