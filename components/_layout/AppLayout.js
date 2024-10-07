import AppNavbar from '@/components/_layout/AppNavbar'
import { useUser } from '@/hooks/useUser'

export default function AppLayout({ children }) {
  return (
    <div className='h-screen bg-neutral-900 flex'>
      <AppNavbar />
      {children}
    </div>
  )
}