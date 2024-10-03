import SideNav from '@/components/_common_/SideNav'
import { useUser } from '@/hooks/useUser'
import DashboardMain from './DashboardMain'

export default function DashboardRoot() {
  const [user, setUser] = useUser()

  return (
    <div className='flex h-screen'>
      <SideNav />
      {user &&
        <DashboardMain user={user} />
      }
    </div>
  )
}