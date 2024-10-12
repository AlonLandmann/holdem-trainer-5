import { useState } from 'react'
import SessionToolbar from './SessionToolbar'

export default function TrainerSessionPage({ user, setPage, selected, setSelected, nrCombos }) {
  const [ranges, setRanges] = useState(null)
  const [range, setRange] = useState(null)
  const [spot, setSpot] = useState(null)
  const [holeCards, setHoleCards] = useState(null)
  const [randomNumber, setRandomNumber] = useState(null)
  const [flash, setFlash] = useState(null)
  const [timer, setTimer] = useState(null)
  const [stats, setStats] = useState([])
  const [wasWrong, setWasWrong] = useState(false) // necc?
  const [sessionId, setSessionId] = useState(null)  // necc?
  const [count, setCount] = useState(1) // necc?

  return (
    <div className='grow'>
      <SessionToolbar
        count={count}
        stats={stats}
        nrCombos={nrCombos}
      />
    </div>
  )
}