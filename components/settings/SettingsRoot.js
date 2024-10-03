import SideNav from '@/components/_layout/SideNav'
import SettingsMain from '@/components/settings/SettingsMain'
import { useUser } from '@/hooks/useUser'

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