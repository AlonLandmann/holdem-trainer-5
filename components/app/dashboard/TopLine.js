import { getMilitaryRank, totalScore } from '@/lib/client/stats'
import RankBanner from './RankBanner'

export default function TopLine({ user }) {
  return (
    <div className='p-2 mb-8 flex gap-6 items-baseline'>
      <h1 className='text-xl'>
        User {user.email.split('@')[0]} 
      </h1>
      <RankBanner
        rank={getMilitaryRank(totalScore(user.trainingSessions))}
        withName
      />
    </div>
  )
}