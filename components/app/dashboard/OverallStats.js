import { averageRangeComplexity, totalCombos, totalScore } from '@/lib/client/stats'
import OverallStat from './OverallStat'

export default function OverallStats({ user }) {
  return (
    <div className='flex flex-wrap flex-col gap-6'>
      <div>
        <h3 className='px-2 text-neutral-500 text-lg mb-2'>
          Ranges
        </h3>
        <div className='flex gap-4'>
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
        </div>
      </div>
      <div>
        <h3 className='px-2 text-neutral-500 text-lg mb-2'>
          Training
        </h3>
        <div className='flex gap-4'>
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
            number={totalScore(user.trainingSessions).toFixed(1)}
            label='total score'
          />
        </div>

      </div>
    </div>
  )
}