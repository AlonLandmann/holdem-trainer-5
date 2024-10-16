import RankBanner from '@/components/dashboard/RankBanner'
import { getMilitaryRank } from '@/lib/stats'
import { useEffect, useState } from 'react'

export default function Leaderboard({ user }) {
  const [leaderboard, setLeaderboard] = useState(null)
  const [userRank, setUserRank] = useState(null)

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/logs/leaderboard')
      const json = await res.json()

      if (json.success) {
        setLeaderboard(json.leaderboard)
        setUserRank(json.leaderboard.findIndex(u => u.id === user.id))
      }
    })()
  }, [])

  return (!leaderboard || !(userRank >= 0)) ? null : (
    <div>
      <div className='p-3 flex flex-col gap-1 border rounded overflow-y-auto no-scrollbar max-h-[600px]'>
        {leaderboard.map((rank, i) => (
          <div
            key={'rank' + i}
            className={`
              flex items-center gap-2 text-sm py-1 px-3
              ${user.id === rank.id ? 'bg-neutral-800  rounded' : ''}
            `}
          >
            <div className='font-mono min-w-6 text-neutral-500 text-right'>
              {i + 1}.
            </div>
            <div className='text-neutral-300'>
              {rank.username ? rank.username : `User ${rank.email.split('@')[0]}`}
            </div>
            <div className='font-mono min-w-36 text-right ml-auto'>
              {rank.totalScore.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div className={`
              min-w-16 flex justify-start ml-2 text-xs
              ${user.id === rank.id || getMilitaryRank(rank.totalScore) === 'Recruit' ? '' : 'opacity-25'}
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