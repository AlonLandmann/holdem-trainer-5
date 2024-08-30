import Button from '@/components/_common_/Button'
import SidebarFolder from './SidebarFolder'

export default function Sidebar({ user }) {
  return (
    <div
      className={`
        bg-neutral-900 max-h-screen overflow-y-auto
        border-r flex flex-col w-56
      `}
    >

      <div className='border-b p-3 flex'>
        <Button
          theme='tertiary'
          utilClasses='text-sm'
          icon='folder-plus'
        />
      </div>
      {user.folders.map(folder => (
        <SidebarFolder
          key={'folder' + folder.id}
          folder={folder}
        />
      ))}
    </div>
  )
}