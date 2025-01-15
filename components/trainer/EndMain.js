import { accuracy, withSeparators } from "@/lib/display";
import { getCurrentRankInfo, getMilitaryRank, getNextRankInfo } from "@/lib/stats";
import RankBanner from "../overview/RankBanner";

export default function EndMain({ user, stats }) {
  const prevScore = user.trainingTotals.total;
  const prevRank = getMilitaryRank(prevScore);
  const pointsEarned = stats.reduce((acc, curr) => (acc + (curr.correct ? curr.rangeComplexity : 0)), 0);
  const totalCorrect = stats.reduce((acc, curr) => (acc + (curr.correct ? 1 : 0)), 0);
  const complexity = totalCorrect > 0 ? pointsEarned / totalCorrect : null;
  const newScore = prevScore + pointsEarned;
  const newRank = getMilitaryRank(newScore);
  const newRankScore = getCurrentRankInfo(newRank).score;
  const nextRankScore = getNextRankInfo(newScore).score;

  return (
    <div
      className="p-7 flex flex-col justify-center items-center overflow-y-auto"
      style={{ height: "calc(100vh - 49px)" }}
    >
      <i className="bi bi-flag text-[100px] text-neutral-700 mb-4"></i>
      <h1 className="text-3xl mb-6 text-center">
        Session complete!
      </h1>
      <div className="text-neutral-500 text-lg mb-2 grid grid-cols-2 gap-3 items-baseline">
        <div className="text-neutral-300 text-right text-xl">
          {stats.length}
        </div>
        <div>
          combos
        </div>
      </div>
      <div className="text-neutral-500 text-lg mb-2 grid grid-cols-2 gap-3 items-baseline">
        <div className="text-neutral-300 text-right text-xl">
          {accuracy(stats)}
        </div>
        <div>
          accuracy
        </div>
      </div>
      {complexity &&
        <div className="text-neutral-500 text-lg mb-2 grid grid-cols-2 gap-3 items-baseline">
          <div className="text-neutral-300 text-right text-xl">
            {complexity.toFixed(2)}
          </div>
          <div>
            complexity
          </div>
        </div>
      }
      <div className="text-neutral-500 text-lg mb-7 grid grid-cols-2 gap-3 items-baseline">
        <div className="text-neutral-300 text-right text-xl">
          {pointsEarned < 10 ? withSeparators(pointsEarned.toFixed(1)) : withSeparators(pointsEarned.toFixed(0))}
        </div>
        <div>
          points
        </div>
      </div>
      <div className="h-[1px] w-56 sm:w-[500px] bg-neutral-800 self-center mb-3"></div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-3">
        <div className="text-xl text-neutral-500 flex items-baseline">
          <div className="text-3xl text-neutral-200 sm:mr-2">
            {withSeparators(newScore.toFixed(0))}
          </div>
        </div>
        <RankBanner rank={newRank} withName />
      </div>
      {getNextRankInfo(newScore) &&
        <>
          <div className="h-[1px] w-56 sm:w-[500px] bg-neutral-800 self-center mb-5"></div>
          <div className="h-[4px] w-40 sm:w-[300px] rounded-sm bg-neutral-800 overflow-hidden mb-3">
            <div
              className="h-full bg-neutral-700"
              style={{ width: `${(100 * (newScore - newRankScore) / (nextRankScore - newRankScore)).toFixed(0)}%` }}
            >

            </div>
          </div>
          <div className="flex gap-2 items-baseline text-nowrap">
            <span className="tracking-wide text-sm text-neutral-500">
              Next rank at
            </span>
            <span className="text-neutral-400">
              {withSeparators(nextRankScore)}
            </span>
            <span className="tracking-wide text-sm text-neutral-500">
              points
            </span>
          </div>
        </>
      }
    </div>
  );
};