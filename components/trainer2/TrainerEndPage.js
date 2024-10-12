import EndMain from './EndMain'
import EndToolbar from './EndToolbar'

export default function TrainerEndPage({ setPage, stats, setStats }) {
  return (
    <div className='grow'>
      <EndToolbar
        setPage={setPage}
        setStats={setStats}
      />
      <EndMain
        stats={stats}
      />
    </div>
  )
}