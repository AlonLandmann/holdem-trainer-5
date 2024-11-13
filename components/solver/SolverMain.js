import { useEffect, useState } from 'react'
import FrequencySetting from './FrequencySetting'
import BoardSetting from './BoardSetting'
import Input from '../_ui/Input'
import { produce } from 'immer'
import Button from '../_ui/Button'
import { combos } from '@/lib/cards'
import PlayerOutput from './PlayerOutput'
import toast from 'react-hot-toast'
import Card from '../trainer/Card'

const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const suits = ['c', 'd', 'h', 's']

function cIntFromCard(card) {
  return values.indexOf(card[0]) * 4 + suits.indexOf(card[1])
}

function cardFromCInt(int) {
  return values[Math.floor(int / 4)] + suits[int % 4];
}

function comboIndexFromCIntCards(c1, c2) {
  const higherCard = Math.max(c1, c2);
  const lowerCard = Math.min(c1, c2);
  const v1 = values[Math.floor(higherCard / 4)];
  const s1 = suits[higherCard % 4];
  const v2 = values[Math.floor(lowerCard / 4)];
  const s2 = suits[lowerCard % 4];
  return combos.indexOf(v1 + s1 + v2 + s2);
}

function getNrBoardCardsRevealed(startingStreet, infoSetStreet) {
  if (startingStreet == 0) {
    if (infoSetStreet == 0) return 0;
    if (infoSetStreet == 1) return 3;
    if (infoSetStreet == 2) return 4;
    if (infoSetStreet == 3) return 5;
  }
  if (startingStreet == 1) {
    if (infoSetStreet == 1) return 0;
    if (infoSetStreet == 2) return 1;
    if (infoSetStreet == 3) return 2;
  }
  if (startingStreet == 2) {
    if (infoSetStreet == 2) return 0;
    if (infoSetStreet == 3) return 1;
  }
  if (startingStreet == 3) {
    if (infoSetStreet == 3) return 0;
  }
}

export default function SolverMain() {
  // main input
  const [street, setStreet] = useState(3)
  const [board, setBoard] = useState(['Qs', '7d', '2s', '6d', '3d'])
  const [frequencies, setFrequencies] = useState(Array(6).fill(Array(1326).fill(0)))
  const [player, setPlayer] = useState(0)
  const [bigBlind, setBigBlind] = useState(2)
  const [minRaise, setMinRaise] = useState(2)
  const [hasFolded, setHasFolded] = useState([false, false, true, true, true, true])
  const [hasActed, setHasActed] = useState([false, false, false, false, false, false])
  const [stacks, setStacks] = useState([2, 2, 4, 4, 4, 4])
  const [committed, setCommitted] = useState([0, 0, 0, 0, 0, 0])
  const [mainPotShares, setMainPotShares] = useState([2, 2, 0, 0, 0, 0])

  // parameters
  const [nrIterations, setNrIterations] = useState(1000000)

  // output
  const [output, setOutput] = useState(null)

  // temporarily add pre-selection of combos
  useEffect(() => {
    setFrequencies(produce(draft => {
      draft[0][0] = 500;
      draft[0][198] = 500;
      draft[0][423] = 500;
      draft[1][0] = 500;
      draft[1][198] = 500;
      draft[1][423] = 500;
    }))
  }, [])

  // auxiliary variable
  const n = street > 0 ? street + 2 : 0

  async function runSolver() {
    const keepStreetForLater = street;
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
      toast.success('Request sent! Please wait.')
      const res = await fetch('http://localhost:8000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',  // Enable CORS for this request
        credentials: 'same-origin',  // If you have cookies or authorization, adjust accordingly
        body: JSON.stringify({
          street,
          board: cBoard,
          nrCombosPerPlayer,
          frequencies: cFrequencies,
          player,
          bigBlind,
          minRaise,
          hasFolded,
          hasActed,
          stacks,
          committed,
          mainPotShares,
          nrIterations,
        })
      })

      const json = await res.json()

      if (json) {
        console.log(json);
        toast.success('Output is ready.')
        setOutput(() => {
          const result = [{}, {}, {}, {}, {}, {}];

          for (let i = 0; i < json.length; i++) {
            const player = json[i].player
            const infoSetStreet = json[i].street;
            const nrBoardCardsRevealed = getNrBoardCardsRevealed(keepStreetForLater, infoSetStreet);
            const key = '!' + json[i].key.slice(0, -(2 + nrBoardCardsRevealed)).join('_') + '?' + (nrBoardCardsRevealed > 0 ? json[i].key.slice(-nrBoardCardsRevealed).join('_') : '')
            const strategy = json[i].strategy;
            const toCall = json[i].toCall;
            const potBeforeCall = json[i].potBeforeCall;
            const card1 = json[i].key[json[i].key.length - nrBoardCardsRevealed - 2];
            const card2 = json[i].key[json[i].key.length - nrBoardCardsRevealed - 1];

            if (!Object.keys(result[player]).includes(key)) {
              result[player][key] = {
                actions: strategy.map(item => item.action),
                toCall,
                potBeforeCall,
                street: infoSetStreet,
                board: board.slice(0, 5 - nrBoardCardsRevealed).concat(nrBoardCardsRevealed > 0 ? json[i].key.slice(-nrBoardCardsRevealed).map(int => cardFromCInt(int)): []),
                strategies: Array(1326).fill(Array(strategy.length).fill(0))
              }
            }

            result[player][key].strategies[comboIndexFromCIntCards(card1, card2)] = strategy.map(item => item.frequency)
          }

          return result
        })
      }
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
          <Input
            theme='editor'
            utilClasses='ml-auto'
            type='number'
            min={1000}
            step={1}
            max={360000000}
            placeholder='1,000 - 360,000,000'
            value={nrIterations}
            onChange={(e) => { setNrIterations(Number(e.target.value)) }}
          />
          <Button
            theme='nice'
            utilClasses='py-3 px-4'
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
              onChange={(e) => { setBigBlind(Number(e.target.value)) }}
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
              onChange={(e) => { setMinRaise(Number(e.target.value)) }}
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
                  onChange={(e) => { setStacks(produce(draft => { draft[i] = Number(e.target.value) })) }}
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
                  onChange={(e) => { setCommitted(produce(draft => { draft[i] = Number(e.target.value) })) }}
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
                  onChange={(e) => { setMainPotShares(produce(draft => { draft[i] = Number(e.target.value) })) }}
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
        {(output && street > 0) &&
          <div className='flex gap-1 mb-4'>
            {Array(n).fill('').map((_, i) => (
              <Card key={'card' + board[i]} card={board[i]} />
            ))}
          </div>
        }
        {output &&
          <div className='flex flex-wrap gap-10'>
            {hasFolded.map((folded, i) => !folded && (
              <PlayerOutput
                key={'player-output' + i}
                player={i}
                frequencies={frequencies}
                output={output[i]}
              />
            ))}
          </div>
        }
      </div>
    </div>
  )
}
