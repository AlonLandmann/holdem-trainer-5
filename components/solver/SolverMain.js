import { useState } from 'react'
import FrequencySetting from './FrequencySetting'

export default function SolverMain() {
  const board = ['Ac', 'Qs', 'Jd', '5h', '8d']
  const [frequencies, setFrequencies] = useState([
    Array(1326).fill(1000),
    Array(1326).fill(1000),
    Array(1326).fill(1000),
    Array(1326).fill(1000),
    Array(1326).fill(1000),
    Array(1326).fill(1000)
  ])

  return (
    <div className='grow overflow-x-auto'>
      <div className='p-7 flex flex-wrap gap-10'>
        {Array(6).fill('').map((_, i) => (
          <FrequencySetting
            index={'player-setting' + i}
            player={i}
            board={board}
            frequencies={frequencies}
            setFrequencies={setFrequencies}
          />
        ))}
      </div>
    </div>
  )
}