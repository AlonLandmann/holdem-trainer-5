import SideNav from '@/components/_layout/SideNav'
import RangePlaceholder from '@/components/manager/RangePlaceholder'
import TrainerMain from '@/components/trainer/TrainerMain'
import { useUser } from '@/hooks/useUser'

export default function TrainerRoot() {
  const [user, setUser] = useUser()

  return (
    <div className='relative flex h-screen'>
      <SideNav />
      {user && !user.hasRanges &&
        <RangePlaceholder />
      }
      {user && user.hasRanges &&
        <TrainerMain user={user} />
      }
    </div>
  )
}