import RangePlaceholder from '@/components/_shared/RangePlaceholder'
import SideNav from '@/components/_layout/SideNav'
import { useUser } from '@/hooks/useUser'
import ManagerMain from './ManagerMain'

export default function ManagerRoot() {
  const [user, setUser] = useUser()

  return (
    <div className='relative flex h-screen'>
      <SideNav />
      {user && !user.hasRanges &&
        <RangePlaceholder />
      }
      {user && user.hasRanges &&
        <ManagerMain user={user} />
      }
    </div>
  )
}