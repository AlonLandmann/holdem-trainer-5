import Leaderboard from './Leaderboard'
import OverallStats from './OverallStats'
import QuoteCta from './QuoteCta'
import TopLine from './TopLine'
import TopRanges from './TopRanges'
import TrainingHistory from './TrainingHistory'

export default function DashboardMain({ user }) {
  return (
    <div className='grow bg-neutral-900'>
      <TopLine user={user} />
      <OverallStats user={user} />
      <section className='flex'>
        <Leaderboard user={user} />
        <QuoteCta />
      </section>
      <TrainingHistory user={user} />
      <TopRanges user={user} />
    </div>
  )
}