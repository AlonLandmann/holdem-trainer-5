import OverallStat from '@/components/overview/OverallStat'
import { useUserData } from '@/hooks/useUserData'

export default function OverallStats() {
  const [user, loaded] = useUserData();

  let total, correct, accuracy, score, trainingComplexity, nrRanges;

  if (loaded.trainingTotals) {
    total = user.trainingTotals.total;
    correct = user.trainingTotals.correct;
    accuracy = total > 0 ? (correct / total).toFixed(2) : '-';
    score = user.trainingTotals.score;
    trainingComplexity = correct > 0 ? (score / correct).toFixed(2) : '-'
  }

  if (loaded.folders) {
    nrRanges = 0;
    user.folders.forEach(folder => {
      folder.ranges.forEach(range => {
        nrRanges++;
      });
    });
  }

  return !loaded.trainingTotals ? null : (
    <div className='flex flex-col items-center gap-8 xs:gap-5 mb-10'>
      <OverallStat
        icon='ui-checks'
        number={nrRanges ? nrRanges : '-'}
        label='nr of ranges'
      />
      <OverallStat
        icon='crosshair'
        number={total}
        label='combos trained'
      />
      <OverallStat
        icon='bullseye'
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