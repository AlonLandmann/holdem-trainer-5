import OverviewMain from '@/components/overview/OverviewMain'
import AppLayout from '../_layout/AppLayout'
import { useEffect } from 'react'
import { useUserData } from '@/hooks/useUserData'

export default function OverviewRoot() {
  const [user, loaded] = useUserData();
  
  useEffect(() => {
    if (loaded.initialComplete && !user.info) {
      window.location = '/auth/login';
    }
  }, [loaded.initialComplete]);

  return (
    <AppLayout>
      {user.info &&
        <OverviewMain />
      }
    </AppLayout>
  )
}