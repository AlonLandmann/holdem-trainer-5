import EndMain from './EndMain'
import EndToolbar from './EndToolbar'

export default function TrainerEndPage({ user, setPage }) {
  return (
    <div className='grow'>
      <EndToolbar />
      <EndMain />
    </div>
  )
}