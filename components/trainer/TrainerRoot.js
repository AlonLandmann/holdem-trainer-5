import RangePlaceholder from '@/components/manager/RangePlaceholder'
import TrainerMain from '@/components/trainer/TrainerMain'
import { useUser } from '@/hooks/useUser'
import AppLayout from '../_layout/AppLayout'

export default function TrainerRoot() {
  const [user, setUser] = useUser()

  return (
    <AppLayout>
      {user && !user.hasRanges &&
        <RangePlaceholder />
      }
      {user && user.hasRanges &&
        <TrainerMain user={user} />
      }
    </AppLayout>
  )
}