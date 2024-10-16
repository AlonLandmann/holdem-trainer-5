import OverallStat from '@/components/dashboard/OverallStat'
import { totalCombos, totalCorrect, totalScore } from '@/lib/stats'

export default function OverallStats({ user }) {
  const combos = totalCombos(user.trainingSessions)
  const correct = totalCorrect(user.trainingSessions)
  const accuracy = combos ? (correct / combos).toFixed(2) : '-'
  const score = totalScore(user.trainingSessions)
  const trainingComplexity = correct ? (score / correct).toFixed(2) : '-'

  return (
    <div className='flex flex-col items-center gap-5 mb-10'>
      <OverallStat
        icon='ui-checks'
        number={user.nrRanges}
        label='nr of ranges'
      />
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
        label='complexity'
      />
      <OverallStat
        icon='graph-up-arrow'
        number={score.toFixed(0)}
        label='total score'
      />
    </div>
  )
}