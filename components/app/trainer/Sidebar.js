import { useState } from 'react'
import SidebarFolder from './SidebarFolder'
import Button from '@/components/_common_/Button'
import toast from 'react-hot-toast'

export default function Sidebar({ user }) {
  const [selected, setSelected] = useState([])

  function handleStartNewSession() {
    if (selected.length) {
      window.location.replace(`/app/trainer?ids=${JSON.stringify(selected)}`)
    } else {
      toast.error('At least one range needs to be selected for training.')
    }
  }

  return (
    <div className='min-w-72 p-5'>
      <div
        className='overflow-y-auto no-scrollbar mb-5'
        style={{ height: 'calc(100vh - 112px - 46px)' }}
      >
        {user.folders.map(folder => (
          <SidebarFolder
            key={'folder' + folder.id}
            folder={folder}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
      <Button
        theme='secondary'
        icon='crosshair'
        text='Start new Session'
        onClick={handleStartNewSession}
      />
    </div>
  )
}