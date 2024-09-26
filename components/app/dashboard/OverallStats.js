import { averageComplexity, totalCombos } from '@/lib/client/stats'
import OverallStat from './OverallStat'

export default function OverallStats({ user }) {
  return (
    <section className='flex p-12 gap-6'>
      <OverallStat
        icon='ui-checks'
        number={user.nrRanges}
        label='number of ranges'
      />
      <OverallStat
        icon='crosshair'
        number={totalCombos(user.trainingSessions)}
        label='combos trained'
      />
      <OverallStat
        icon='columns-gap'
        number={`${(100 * averageComplexity(user)).toFixed(1)}`}
        label='avg complexity'
      />
      <OverallStat
        icon='graph-up-arrow'
        number={totalCombos(user.trainingSessions)}
        label='total score'
      />
    </section>
  )
}