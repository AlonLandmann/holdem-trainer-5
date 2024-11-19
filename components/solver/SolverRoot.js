import { useUser } from '@/hooks/useUser'
import AppLayout from '../_layout/AppLayout'
import SolverMain from './SolverMain'
import SolverPlaceholder from './SolverPlaceholder'

export default function SolverRoot() {
  const [user, setUser] = useUser()

  return (
    <AppLayout>
      {(!user || user.role !== 'admin')
        ? <SolverPlaceholder />
        : <SolverMain />
      }
    </AppLayout>
  )
}