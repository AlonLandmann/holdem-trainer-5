import RangePlaceholder from '@/components/_common_/RangePlaceholder'
import SideNav from '@/components/_common_/SideNav'
import { useUser } from '@/hooks/useUser'
import Sidebar from './Sidebar'

export default function ManagerRoot() {
  const user = useUser()
  const hasRanges = user && user.folders.reduce((acc, curr) => (acc || curr.ranges.length), false)

  return (
    <div className='flex'>
      <SideNav />
      {user && !hasRanges &&
        <RangePlaceholder />
      }
      {user && hasRanges &&
        <>
          <Sidebar user={user} />
          <div className='grow bg-neutral-900'></div>
        </>
      }
    </div>
  )
}