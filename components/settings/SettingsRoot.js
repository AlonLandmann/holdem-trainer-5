import SettingsMain from '@/components/settings/SettingsMain'
import { useUser } from '@/hooks/useUser'
import AppLayout from '../_layout/AppLayout'
import { useEffect } from 'react'

export default function SettingsRoot() {
  const [user, setUser, isLoading] = useUser()
  
  useEffect(() => {
    if (!isLoading && !user) {
      window.location = '/auth/login'
    }
  }, [isLoading])

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