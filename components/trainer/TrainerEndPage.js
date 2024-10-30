import EndMain from './EndMain'
import EndToolbar from './EndToolbar'

export default function TrainerEndPage({ user, setPage, stats, setStats, fetchUser }) {
  return (
    <div className='grow overflow-x-hidden max-h-screen'>
      <EndToolbar
        setPage={setPage}
        setStats={setStats}
        fetchUser={fetchUser}
      />
      <EndMain
        user={user}
        stats={stats}
      />
    </div>
  )
}