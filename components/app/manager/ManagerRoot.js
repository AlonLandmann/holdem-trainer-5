import RangePlaceholder from '@/components/_common_/RangePlaceholder'
import SideNav from '@/components/_common_/SideNav'
import { useUser } from '@/hooks/useUser'
import ManagerMain from './ManagerMain'

export default function ManagerRoot() {
  const user = useUser()

  return (
    <div className='flex'>
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