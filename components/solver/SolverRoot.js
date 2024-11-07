import { useUser } from '@/hooks/useUser'
import AppLayout from '../_layout/AppLayout'
import SolverMain from './SolverMain'

export default function SolverRoot() {
  const [user, setUser] = useUser()

  return (!user || user.role !== 'admin') ? <div>A solver is currently in development.</div> : (
    <AppLayout>
      <SolverMain />
    </AppLayout>
  )
}