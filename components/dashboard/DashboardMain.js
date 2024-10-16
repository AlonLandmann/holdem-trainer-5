import Leaderboard from '@/components/dashboard/Leaderboard'
import OverallStats from '@/components/dashboard/OverallStats'
import TopLine from '@/components/dashboard/TopLine'
import TrainingHistory from '@/components/dashboard/TrainingHistory'

export default function DashboardMain({ user }) {
  return (
    <div className='grow bg-neutral-900 p-8 max-h-screen overflow-y-auto flex flex-col items-center'>
      <TopLine user={user} />
      <OverallStats user={user} />
      <Leaderboard user={user} />
      <TrainingHistory user={user} />
    </div>
  )
}