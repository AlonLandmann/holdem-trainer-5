import OverviewMain from '@/components/overview/OverviewMain'
import { useUser } from '@/hooks/useUser'
import AppLayout from '../_layout/AppLayout'

export default function OverviewRoot() {
  const [user, setUser] = useUser()

  return (
    <AppLayout>
      {user &&
        <OverviewMain user={user} />
      }
    </AppLayout>
  )
}