import Leaderboard from '@/components/dashboard/Leaderboard'
import OverallStats from '@/components/dashboard/OverallStats'
import TopLine from '@/components/dashboard/TopLine'
import TrainingHistory from '@/components/dashboard/TrainingHistory'

export default function DashboardMain({ user }) {
  return (
    <div className='grow bg-neutral-900 p-5 max-h-screen overflow-y-auto'>
      <TopLine user={user} />
      <OverallStats user={user} />
      <section className='flex flex-wrap gap-8'>
        <Leaderboard user={user} />
        <TrainingHistory user={user} />
      </section>
    </div>
  )
}