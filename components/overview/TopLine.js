import RankBanner from '@/components/overview/RankBanner'
import { useUserData } from '@/hooks/useUserData'
import { getMilitaryRank } from '@/lib/stats'

export default function TopLine() {
  const [user, loaded] = useUserData();

  return !loaded.trainingTotals ? null : (
    <div className='p-2 mb-5 flex flex-col items-center'>
      <h1 className='text-xl mb-4 text-neutral-400 truncate'>
        {user.info.username}
      </h1>
      <div className='h-[1px] w-56 sm:w-[500px] bg-neutral-800 self-center mb-3'></div>
      <RankBanner
        rank={getMilitaryRank(user.trainingTotals.score)}
        withName
      />
      <div className='h-[1px] w-56 sm:w-[500px] bg-neutral-800 self-center mt-3'></div>
    </div>
  )
}