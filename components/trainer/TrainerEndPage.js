import EndMain from './EndMain'
import EndToolbar from './EndToolbar'

export default function TrainerEndPage({ user, setPage, stats, setStats }) {
  return (
    <div className='grow'>
      <EndToolbar
        setPage={setPage}
        setStats={setStats}
      />
      <EndMain
        user={user}
        stats={stats}
      />
    </div>
  )
}