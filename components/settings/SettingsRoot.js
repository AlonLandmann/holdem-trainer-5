import SideNav from '@/components/_layout/SideNav'
import { useUser } from '@/hooks/useUser'
import SettingsMain from './SettingsMain'

export default function SettingsRoot() {
  const [user, setUser] = useUser()

  return (
    <div className='flex h-screen bg-neutral-900'>
      <SideNav />
      {user &&
        <SettingsMain user={user} />
      }
    </div>
  )
}