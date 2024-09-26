import { averageRangeComplexity, totalCombos, totalScore } from '@/lib/client/stats'
import OverallStat from './OverallStat'

export default function OverallStats({ user }) {
  return (
    <section className='flex p-12 gap-6'>
      <OverallStat
        icon='ui-checks'
        number={user.nrRanges}
        label='nr of ranges'
      />
      <OverallStat
        icon='columns-gap'
        number={`${(averageRangeComplexity(user)).toFixed(2)}`}
        label='range complexity'
      />
      <OverallStat
        icon='crosshair'
        number={totalCombos(user.trainingSessions)}
        label='combos trained'
      />
      <OverallStat
        icon='layout-wtf'
        number={(totalScore(user.trainingSessions) / totalCombos(user.trainingSessions)).toFixed(2)}
        label='training complexity'
      />
      <OverallStat
        icon='graph-up-arrow'
        number={totalScore(user.trainingSessions).toFixed(0)}
        label='total score'
      />
    </section>
  )
}