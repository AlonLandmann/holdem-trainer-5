import OverviewMain from '@/components/overview/OverviewMain'
import { useUser } from '@/hooks/useUser'
import AppLayout from '../_layout/AppLayout'
import { useEffect } from 'react'

export default function OverviewRoot() {
  const [user, setUser, isLoading] = useUser()
  
  useEffect(() => {
    if (!isLoading && !user) {
      window.location = '/auth/login'
    }
  }, [isLoading])

  return (
    <AppLayout>
      {user &&
        <OverviewMain user={user} />
      }
    </AppLayout>
  )
}