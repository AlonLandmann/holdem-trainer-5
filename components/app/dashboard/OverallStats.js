import { averageComplexity, totalCombos } from '@/lib/client/stats'
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
        number={`${(averageComplexity(user)).toFixed(2)}`}
        label='avg complexity'
      />
      <OverallStat
        icon='crosshair'
        number={totalCombos(user.trainingSessions)}
        label='combos trained'
      />
      <OverallStat
        icon='graph-up-arrow'
        number={totalCombos(user.trainingSessions) * 0.6}
        label='total score'
      />
    </section>
  )
}