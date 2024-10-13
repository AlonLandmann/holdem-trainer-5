import { accuracy, withSeparators } from '@/lib/display'
import { getMilitaryRank, totalScore } from '@/lib/stats'
import RankBanner from '../dashboard/RankBanner'

export default function EndMain({ user, stats }) {
  const prevScore = totalScore(user.trainingSessions)
  const prevRank = getMilitaryRank(prevScore)

  const pointsEarned = stats.reduce((acc, curr) => (acc + (curr.correct ? curr.rangeComplexity : 0)), 0)
  const newScore = prevScore + pointsEarned
  const newRank = getMilitaryRank(newScore)

  return (
    <div
      className='p-8 flex flex-col justify-center items-center'
      style={{ minHeight: 'calc(100vh - 49px)' }}
    >
      <i className='bi bi-flag text-[100px] text-neutral-700 mb-4'></i>
      <h1 className='text-3xl mb-5'>
        Session complete!
      </h1>
      <div className='text-neutral-500 text-lg mb-2'>
        {stats.length} combos trained
      </div>
      <div className='text-neutral-500 text-lg mb-4'>
        {accuracy(stats)} accuracy
      </div>
      <div className='text-xl text-neutral-500 flex gap-2 items-baseline mb-3'>
        <i className='bi bi-plus text-3xl'></i>
        <div className='text-3xl text-neutral-200'>
          {withSeparators(pointsEarned.toFixed(0))}
        </div>
        <div>
          Points earned
        </div>
      </div>
      <div className='h-[1px] w-[500px] bg-neutral-800 self-center mb-3'></div>
      <div className='text-xl text-neutral-500 flex items-center mb-1'>
        <div className='text-3xl text-neutral-200 mr-2'>
          {withSeparators(newScore.toFixed(0))}
        </div>
        <div className='mr-4'>
          Point total
        </div>
        <RankBanner rank={newRank} withName />
      </div>
      <div>
      </div>
    </div >
  )
}