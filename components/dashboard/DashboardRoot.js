import DashboardMain from '@/components/dashboard/DashboardMain'
import { useUser } from '@/hooks/useUser'
import AppLayout from '../_layout/AppLayout'

export default function DashboardRoot() {
  const [user, setUser] = useUser()

  return (
    <AppLayout>
      {user &&
        <DashboardMain user={user} />
      }
    </AppLayout>
  )
}