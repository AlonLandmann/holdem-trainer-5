import Leaderboard from '@/components/overview/Leaderboard'
import OverallStats from '@/components/overview/OverallStats'
import TopLine from '@/components/overview/TopLine'
import TrainingHistory from '@/components/overview/TrainingHistory'

export default function OverviewMain() {
  return (
    <div className='grow bg-neutral-900 p-7 max-h-screen overflow-y-auto flex flex-col items-center overflow-x-hidden'>
      <TopLine />
      <OverallStats />
      <TrainingHistory />
      <Leaderboard />
    </div>
  )
}