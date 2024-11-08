import { useState } from 'react'
import FrequencySetting from './FrequencySetting'
import BoardSetting from './BoardSetting'
import Input from '../_ui/Input'
import { produce } from 'immer'

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
      <div className='p-2 flex flex-col gap-6'>
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
          <select
            className='w-32 appearance-none'
            value={player}
            onChange={e => { setPlayer(Number(e.target.value)) }}
          >
            <option value='0'>SB</option>
            <option value='1'>BB</option>
            <option value='2'>UTG</option>
            <option value='3'>HJ</option>
            <option value='4'>CO</option>
            <option value='5'>BTN</option>
          </select>
          <div className='flex gap-1'>
            {hasFolded.map((folded, i) => (
              <select
                key={'folded' + i}
                className='w-14 appearance-none'
                value={folded ? 'F' : 'A'}
                onChange={e => { setHasFolded(produce(draft => { draft[i] = e.target.value == 'F' })) }}
              >
                <option value='A'>A</option>
                <option value='F'>F</option>
              </select>
            ))}
          </div>
          <div className='flex gap-1'>
            {hasActed.map((acted, i) => (
              <select
                key={'acted' + i}
                className='w-14 appearance-none'
                value={acted ? 'A' : '-'}
                onChange={e => { setHasActed(produce(draft => { draft[i] = e.target.value == 'A' })) }}
              >
                <option value='A'>A</option>
                <option value='-'>-</option>
              </select>
            ))}
          </div>
        </div>
        <div className='flex gap-4'>
          <div>
            <div className='mb-1 text-neutral-500 px-2'>
              big blind
            </div>
            <Input
              theme='editor'
              utilClasses='w-32'
              type='number'
              min={1}
              step={1}
              value={bigBlind}
              onChange={(e) => { setBigBlind(e.target.value) }}
            />
          </div>
          <div>
            <div className='mb-1 text-neutral-500 px-2'>
              min-raise
            </div>
            <Input
              theme='editor'
              utilClasses='w-32'
              type='number'
              min={1}
              step={1}
              value={minRaise}
              onChange={(e) => { setMinRaise(e.target.value) }}
            />
          </div>
        </div>
        <div className='flex flex-wrap gap-10'>
          {hasFolded.map((folded, i) => !folded && (
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
