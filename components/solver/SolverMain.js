import { useState } from 'react'
import FrequencySetting from './FrequencySetting'
import BoardSetting from './BoardSetting'

export default function SolverMain() {
  const [street, setStreet] = useState(3)
  const [board, setBoard] = useState(['As', 'Qs', 'Jd', '5h', '8d'])
  const [frequencies, setFrequencies] = useState(Array(6).fill(Array(1326).fill(1000)))
  const [player, setPlayer] = useState(0)
  const [bigBlind, setBigBlind] = useState(2)
  const [minRaise, setMinRaise] = useState(2)
  const [hasFolded, setHasFolded] = useState([false, false, true, true, true, true])
  const [hasActed, setHasActed] = useState([false, false, false, false, false, false])
  const [stacks, setStacks] = useState([3, 3, 4, 4, 4, 4])
  const [committed, setCommitted] = useState([0, 0, 0, 0, 0, 0])
  const [mainPotShares, setMainPotShares] = useState([0, 0, 0, 0, 0, 0])

  return (
    <div className='grow overflow-x-auto'>
      <div className='p-2 flex flex-col gap-8'>
        <div className='flex gap-2'>
          <select
            className='w-32 appearance-none'
            value={street}
            onChange={e => { setStreet(Number(e.target.value)) }}
          >
            <option value='0'>Pre-Flop</option>
            <option value='1'>Flop</option>
            <option value='2'>Turn</option>
            <option value='3'>River</option>
          </select>
          <BoardSetting
            street={street}
            board={board}
            setBoard={setBoard}
          />
        </div>
        <div className='flex flex-wrap gap-10'>
          {Array(6).fill('').map((_, i) => (
            <FrequencySetting
              index={'player-setting' + i}
              player={i}
              street={street}
              board={board}
              frequencies={frequencies}
              setFrequencies={setFrequencies}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
