import { useEffect, useState } from 'react'
import RankBanner from './RankBanner'
import { getMilitaryRank } from '@/lib/client/stats'

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

  return (!leaderboard || !(userRank > 0)) ? null : (
    <div>
      <h3 className='px-2 text-neutral-500 text-lg mb-2'>
        Leaderboard
      </h3>
      <div className='p-3 flex flex-col gap-1 border rounded'>
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
            <div className='min-w-16 flex justify-start ml-2 text-xs grayscale opacity-75'>
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