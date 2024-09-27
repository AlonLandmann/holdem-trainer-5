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

  return (!leaderboard || !(userRank > 0)) ? null : (
    <div className='border rounded p-4'>
      <div className='flex justify-between items-center gap-4 text-neutral-500'>
        <h3 className='uppercase tracking-wide text-sm'>
          Leaderboards
        </h3>
        <i className='bi bi-graph-up-arrow'></i>
      </div>
      <div>

      </div>
    </div>
  )
}