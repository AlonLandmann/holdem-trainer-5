import Leaderboard from '@/components/overview/Leaderboard'
import OverallStats from '@/components/overview/OverallStats'
import TopLine from '@/components/overview/TopLine'
import TrainingHistory from '@/components/overview/TrainingHistory'

export default function OverviewMain({ user }) {
  return (
    <div className='grow bg-neutral-900 p-7 max-h-screen overflow-y-auto flex flex-col items-center'>
      <TopLine user={user} />
      <OverallStats user={user} />
      <TrainingHistory user={user} />
      <Leaderboard user={user} />
    </div>
  )
}