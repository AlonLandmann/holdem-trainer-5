import { useEffect, useState } from 'react'
import SidebarFolder from './SidebarFolder'
import Button from '@/components/_common_/Button'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function Sidebar({ user }) {
  const router = useRouter()
  const [selected, setSelected] = useState([])

  useEffect(() => {
    if (router.query) {
      setSelected(JSON.parse(router.query.ids))
    }
  }, [router.isReady])

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
        className='overflow-y-auto no-scrollbar mb-5 flex flex-col gap-2'
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
        text='Start new Session'
        onClick={handleStartNewSession}
      />
    </div>
  )
}