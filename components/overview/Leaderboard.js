import RankBanner from '@/components/overview/RankBanner'
import { useUserData } from '@/hooks/useUserData'
import { getMilitaryRank } from '@/lib/stats'
import { useEffect, useState } from 'react'

export default function Leaderboard() {
  const [user, loaded] = useUserData()
  const [leaderboard, setLeaderboard] = useState(null)
  const [userRank, setUserRank] = useState(null)

  useEffect(() => {
    (async () => {
      if (user.info) {
        const res = await fetch("/api/logs/leaderboard");
        const json = await res.json();

        if (json.success) {
          setLeaderboard(json.leaderboard);
          setUserRank(json.leaderboard.findIndex(u => u.id === user.info.id));
        }
      }
    })()
  }, [loaded.info])

  return (!leaderboard || !(userRank >= 0)) ? null : (
    <div className='flex flex-col items-center'>
      <h1 className='text-lg text-center mb-2 text-neutral-500'>
        Leaderboard
      </h1>
      <div className='h-[1px] w-56 xs:w-full bg-neutral-800 self-center mb-4'></div>
      <div className='flex flex-col gap-1 max-h-[330px] overflow-y-auto no-scrollbar' style={{ maxWidth: 'calc(100vw - 102px)' }}>
        {leaderboard.map((rank, i) => (
          <div
            key={'rank' + i}
            className={`
              flex items-center gap-2 text-sm py-1 px-3
              ${user.info.id === rank.id ? 'bg-neutral-800  rounded' : ''}
            `}
          >
            <div className='font-mono min-w-6 text-neutral-500 text-right'>
              {i + 1}.
            </div>
            <div className='text-neutral-300 truncate pr-2'>
              {rank.username ? rank.username : 'no-name'}
            </div>
            <div className='font-mono text-right ml-auto'>
              {rank.totalScore.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div className={`
              min-w-16 flex justify-start ml-2 text-xs
              ${user.info.id === rank.id || getMilitaryRank(rank.totalScore) === 'Recruit' ? '' : 'opacity-25'}
            `}>
              <RankBanner
                rank={getMilitaryRank(rank.totalScore)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}