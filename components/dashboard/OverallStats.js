import OverallStat from '@/components/dashboard/OverallStat'
import { averageRangeComplexity, totalCombos, totalCorrect, totalScore } from '@/lib/stats'

export default function OverallStats({ user }) {
  const combos = totalCombos(user.trainingSessions)
  const correct = totalCorrect(user.trainingSessions)
  const accuracy = combos ? (correct / combos).toFixed(2) : '-'
  const score = totalScore(user.trainingSessions)
  const trainingComplexity = correct ? (score / correct).toFixed(2) : '-'

  return (
    <div className='flex flex-wrap gap-8 mb-8'>
      <div>
        <h3 className='px-2 text-neutral-500 text-lg mb-2'>
          Ranges
        </h3>
        <div className='flex gap-3'>
          <OverallStat
            icon='ui-checks'
            number={user.nrRanges}
            label='nr of ranges'
          />
          <OverallStat
            icon='columns-gap'
            number={averageRangeComplexity(user)}
            label='range complexity'
          />
        </div>
      </div>
      <div>
        <h3 className='px-2 text-neutral-500 text-lg mb-2'>
          Training
        </h3>
        <div className='flex gap-3'>
          <OverallStat
            icon='hash'
            number={combos}
            label='combos trained'
          />
          <OverallStat
            icon='crosshair'
            number={accuracy}
            label='accuracy'
          />
          <OverallStat
            icon='layout-wtf'
            number={trainingComplexity}
            label='training complexity'
          />
          <OverallStat
            icon='graph-up-arrow'
            number={score.toFixed(0)}
            label='total score'
          />
        </div>
      </div>
    </div>
  )
}