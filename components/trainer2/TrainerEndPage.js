import EndMain from './EndMain'
import EndToolbar from './EndToolbar'

export default function TrainerEndPage({ user, setPage, stats }) {
  return (
    <div className='grow'>
      <EndToolbar />
      <EndMain stats={stats} />
    </div>
  )
}