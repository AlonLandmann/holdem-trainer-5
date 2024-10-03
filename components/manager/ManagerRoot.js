import SideNav from '@/components/_layout/SideNav'
import ManagerMain from '@/components/manager/ManagerMain'
import RangePlaceholder from '@/components/manager/RangePlaceholder'
import { useUser } from '@/hooks/useUser'

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