import SideNav from '@/components/_layout/SideNav'
import DashboardMain from '@/components/dashboard/DashboardMain'
import { useUser } from '@/hooks/useUser'

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