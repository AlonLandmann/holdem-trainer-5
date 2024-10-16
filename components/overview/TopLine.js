import RankBanner from '@/components/overview/RankBanner'
import { getMilitaryRank, totalScore } from '@/lib/stats'

export default function TopLine({ user }) {
  return (
    <div className='p-2 mb-5 flex flex-col items-center'>
      <h1 className='text-xl mb-4 text-neutral-400'>
        {user.username}
      </h1>
      <div className='h-[1px] w-[500px] bg-neutral-800 self-center mb-3'></div>
      <RankBanner
        rank={getMilitaryRank(totalScore(user.trainingSessions))}
        withName
      />
      <div className='h-[1px] w-[500px] bg-neutral-800 self-center mt-3'></div>
    </div>
  )
}