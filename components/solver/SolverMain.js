import { useState } from 'react'
import FrequencySetting from './FrequencySetting'
import BoardSetting from './BoardSetting'
import Input from '../_ui/Input'
import { produce } from 'immer'
import Button from '../_ui/Button'
import { combos } from '@/lib/cards'

function cIntFromCard(card) {
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
  const suits = ['c', 'd', 'h', 's']

  return values.indexOf(card[0]) * 4 + suits.indexOf(card[1])
}

export default function SolverMain() {
  const [street, setStreet] = useState(3)
  const [board, setBoard] = useState(['Qs', '7d', '2s', '6d', '3d'])
  const [frequencies, setFrequencies] = useState(Array(6).fill(Array(1326).fill(0)))
  const [player, setPlayer] = useState(0)
  const [bigBlind, setBigBlind] = useState(2)
  const [minRaise, setMinRaise] = useState(2)
  const [hasFolded, setHasFolded] = useState([false, false, true, true, true, true])
  const [hasActed, setHasActed] = useState([false, false, false, false, false, false])
  const [stacks, setStacks] = useState([3, 3, 4, 4, 4, 4])
  const [committed, setCommitted] = useState([0, 0, 0, 0, 0, 0])
  const [mainPotShares, setMainPotShares] = useState([0, 0, 0, 0, 0, 0])

  async function runSolver() {
    const cBoard = board.map(card => cIntFromCard(card));
    const nrCombosPerPlayer = Array(6).fill(0);
    const cFrequencies = [];

    let totalComboCounter = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 1326; j++) {
        if (frequencies[i][j] > 0) {
          cFrequencies[3 * totalComboCounter + 0] = cIntFromCard(combos[j].slice(0, 2))
          cFrequencies[3 * totalComboCounter + 1] = cIntFromCard(combos[j].slice(2, 4))
          cFrequencies[3 * totalComboCounter + 2] = frequencies[i][j];
          nrCombosPerPlayer[i] += 1;
          totalComboCounter += 1;
        }
      }
    }

    try {
      await fetch('http://localhost:8000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          street,
          board: cBoard,
          nrCombosPerPlayer,
          frequencies: cFrequencies,
          totalComboCounter,
          player,
          bigBlind,
          minRaise,
          hasFolded,
          hasActed,
          stacks,
          committed,
          mainPotShares,
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='grow overflow-x-auto'>
      <div className='p-2 flex flex-col'>
        <div className='flex flex-wrap gap-2 mb-4'>
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
          <Button
            theme='nice'
            utilClasses='py-3 px-4 ml-auto'
            text='run solver'
            onClick={runSolver}
            useQueue
          />
        </div>
        <div className='flex flex-wrap gap-4 mb-7'>
          <div>
            <div className='mb-1 text-neutral-500 px-2 text-center'>
              bb
            </div>
            <Input
              theme='editor'
              utilClasses='w-14 spinner-less text-center'
              type='number'
              min={1}
              step={1}
              value={bigBlind}
              onChange={(e) => { setBigBlind(e.target.value) }}
            />
          </div>
          <div>
            <div className='mb-1 text-neutral-500 px-2 text-center'>
              mr
            </div>
            <Input
              theme='editor'
              utilClasses='w-14 spinner-less text-center'
              type='number'
              min={1}
              step={1}
              value={minRaise}
              onChange={(e) => { setMinRaise(e.target.value) }}
            />
          </div>
          <div>
            <div className='mb-1 text-neutral-500 px-2 text-center'>
              stacks
            </div>
            <div className='flex gap-1'>
              {stacks.map((stack, i) => (
                <Input
                  key={'stack' + i}
                  theme='editor'
                  utilClasses='w-14 spinner-less text-center'
                  type='number'
                  min={1}
                  step={1}
                  value={stack}
                  onChange={(e) => { setStacks(produce(draft => { draft[i] = e.target.value })) }}
                />
              ))}
            </div>
          </div>
          <div>
            <div className='mb-1 text-neutral-500 px-2 text-center'>
              committed
            </div>
            <div className='flex gap-1'>
              {committed.map((comm, i) => (
                <Input
                  key={'committed' + i}
                  theme='editor'
                  utilClasses='w-14 spinner-less text-center'
                  type='number'
                  min={1}
                  step={1}
                  value={comm}
                  onChange={(e) => { setCommitted(produce(draft => { draft[i] = e.target.value })) }}
                />
              ))}
            </div>
          </div>
          <div>
            <div className='mb-1 text-neutral-500 px-2 text-center'>
              pot shares
            </div>
            <div className='flex gap-1'>
              {mainPotShares.map((share, i) => (
                <Input
                  key={'share' + i}
                  theme='editor'
                  utilClasses='w-14 spinner-less text-center'
                  type='number'
                  min={1}
                  step={1}
                  value={share}
                  onChange={(e) => { setMainPotShares(produce(draft => { draft[i] = e.target.value })) }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-wrap gap-10 mb-7'>
          {hasFolded.map((folded, i) => !folded && (
            <FrequencySetting
              key={'player-setting' + i}
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
