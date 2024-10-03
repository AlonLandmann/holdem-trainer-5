import RangePlaceholder from '../manager/RangePlaceholder'
import SideNav from '@/components/_layout/SideNav'
import { useUser } from '@/hooks/useUser'
import TrainerMain from './TrainerMain'

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