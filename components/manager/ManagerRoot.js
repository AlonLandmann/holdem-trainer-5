import ManagerMain from '@/components/manager/ManagerMain'
import RangePlaceholder from '@/components/manager/RangePlaceholder'
import { useUser } from '@/hooks/useUser'
import AppLayout from '../_layout/AppLayout'

export default function ManagerRoot() {
  const [user, setUser] = useUser()

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