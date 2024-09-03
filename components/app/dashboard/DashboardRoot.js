import SideNav from '@/components/_common_/SideNav'

export default function DashboardRoot() {
  return (
    <div className='flex h-screen'>
      <SideNav />
      <div>Dashboard</div>
    </div>
  )
}