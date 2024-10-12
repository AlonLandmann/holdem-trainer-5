import { useState } from 'react'
import StartToolbar from './StartToolbar'
import StartMain from './StartMain'

export default function TrainerStartPage({ user, setPage }) {
  const [selected, setSelected] = useState([])

  return (
    <div className='grow'>
      <StartToolbar
        selected={selected}
      />
      <StartMain
        user={user}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  )
}