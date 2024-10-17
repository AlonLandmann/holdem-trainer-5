import Button from '@/components/_ui/Button'
import SidebarFolder from '@/components/manager/SidebarFolder'
import SidebarGap from '@/components/manager/SidebarGap'
import { useLoadingQueue } from '@/hooks/useLoadingQueue'
import { useUser } from '@/hooks/useUser'
import handleManagerRequest from '@/lib/managerRequests'
import { useState } from 'react'

export default function Sidebar({ selectedFolder, setSelectedFolder }) {
  const [user, setUser] = useUser()
  const [loadingQueue, setLoadingQueue] = useLoadingQueue()
  const [target, setTarget] = useState(null)

  async function handleAddFolder() {
    await handleManagerRequest('/api/folders/add', 'POST', setUser)
  }

  function handleDragLeave(event) {
    if (!loadingQueue) {
      const isLeavingParent = !event.currentTarget.contains(event.relatedTarget)

      if (isLeavingParent) {
        setTarget(null)
      }
    }
  }

  return !user ? null : (
    <div className='border-r min-w-48 flex flex-col'>
      <div className='border-b p-3 flex justify-between items-center'>
        <h1 className='text-neutral-500'>
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
      <div onDragLeave={handleDragLeave}>
        <SidebarGap
          index={0}
          target={target}
          setTarget={setTarget}
        />
        {user.folders.map((folder, i) => (
          <div key={'folder' + folder.id}>
            <SidebarFolder
              folder={folder}
              isSelected={selectedFolder.id === folder.id}
              setSelectedFolder={setSelectedFolder}
              target={target}
              setTarget={setTarget}
            />
            <SidebarGap
              index={i + 1}
              target={target}
              setTarget={setTarget}
            />
          </div>
        ))}
      </div>
      <div className='border-t mt-auto p-3 flex justify-between items-center'>
        <span className='text-neutral-600'>
          {user.nrRanges}{(!user || user.membership === 'HT-Basic') ? ' / 20' : ''} ranges
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