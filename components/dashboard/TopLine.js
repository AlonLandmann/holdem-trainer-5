import RankBanner from '@/components/dashboard/RankBanner'
import { getMilitaryRank, totalScore } from '@/lib/stats'

export default function TopLine({ user }) {
  return (
    <div className='p-2 mb-8 flex gap-6 items-baseline'>
      <h1 className='text-xl'>
        {user.username} 
      </h1>
      <RankBanner
        rank={getMilitaryRank(totalScore(user.trainingSessions))}
        withName
      />
    </div>
  )
}