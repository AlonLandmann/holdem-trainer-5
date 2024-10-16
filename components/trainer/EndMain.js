import { accuracy, withSeparators } from '@/lib/display'
import { getCurrentRankInfo, getMilitaryRank, getNextRankInfo, totalScore } from '@/lib/stats'
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
      <div className='flex items-center gap-3 mb-3'>
        <div className='text-xl text-neutral-500 flex items-baseline'>
          <div className='text-3xl text-neutral-200 mr-2'>
            {withSeparators(newScore.toFixed(0))}
          </div>
        </div>
        <RankBanner rank={newRank} withName />
      </div>
      {getNextRankInfo(newScore) &&
        <>
          <div className='h-[1px] w-[500px] bg-neutral-800 self-center mb-5'></div>
          <div className='h-[4px] w-[300px] rounded-sm bg-neutral-800 overflow-hidden mb-3'>
            <div className='h-full bg-neutral-700' style={{ width: `${(100 * (newScore - getCurrentRankInfo(newScore).score) / (getNextRankInfo(newScore).score - getCurrentRankInfo(newScore).score)).toFixed(0)}%` }}></div>
          </div>
          <div className='flex gap-2 items-baseline'>
            <span className='tracking-wide text-sm text-neutral-500'>
              Next rank at
            </span>
            <span className='text-neutral-400'>
              {withSeparators(getNextRankInfo(newScore).score)}
            </span>
            <span className='tracking-wide text-sm text-neutral-500'>
              points
            </span>
          </div>
        </>
      }
    </div>
  )
}