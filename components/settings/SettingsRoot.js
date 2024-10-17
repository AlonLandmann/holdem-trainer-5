import SettingsMain from '@/components/settings/SettingsMain'
import { useUser } from '@/hooks/useUser'
import AppLayout from '../_layout/AppLayout'

export default function SettingsRoot() {
  const [user, setUser] = useUser()

  return (
    <AppLayout>
      {user &&
        <SettingsMain
          user={user}
          setUser={setUser}
        />
      }
    </AppLayout>
  )
}