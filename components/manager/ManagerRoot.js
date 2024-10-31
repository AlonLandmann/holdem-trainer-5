import ManagerMain from '@/components/manager/ManagerMain'
import RangePlaceholder from '@/components/manager/RangePlaceholder'
import { useUser } from '@/hooks/useUser'
import AppLayout from '../_layout/AppLayout'
import { useEffect } from 'react'

export default function ManagerRoot() {
  const [user, setUser, isLoading] = useUser()
  
  useEffect(() => {
    if (!isLoading && !user) {
      window.location = '/auth/login'
    }
  }, [isLoading])

  return (
    <AppLayout>
      {user && !user.hasRanges &&
        <RangePlaceholder />
      }
      {user && user.hasRanges &&
        <ManagerMain user={user} />
      }
    </AppLayout>
  )
}