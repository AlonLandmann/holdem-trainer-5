import { useState } from 'react'
import FrequencySetting from './FrequencySetting'
import BoardSetting from './BoardSetting'

export default function SolverMain() {
  const [board, setBoard] = useState(['Ac', 'Qs', 'Jd', '5h', '8d'])
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
      <div className='p-2 flex flex-col gap-8'>
        <div>
          <BoardSetting
            board={board}
            setBoard={setBoard}
          />
        </div>
        <div className='flex flex-wrap gap-10'>
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
    </div>
  )
}

// int board[5] = {
//   create_card('Q', 's'),
//   create_card('7', 'd'),
//   create_card('2', 's'),
//   create_card('6', 'd'),
//   create_card('3', 'd')
// };

// int big_blind = 2;
// node start_node = {
//   .has_folded = {0, 0, 1, 1, 1, 1},
//   .has_acted = {0, 0, 0, 0, 0, 0},
//   .stacks = {3, 3, 5, 5, 5, 5},
//   .committed = {0, 0, 0, 0, 0, 0},
//   .main_pot_shares = {2, 2, 0, 0, 0, 0},
//   .min_raise = 2,
//   .street = 3,
//   .player = 0
// };

// DONE

// int nr_combos_per_player[6] = {3, 3, 0, 0, 0, 0};
// int frequencies[18] = {
//   create_card('A', 's'), create_card('A', 'd'), 100,
//   create_card('K', 's'), create_card('K', 'd'), 100,
//   create_card('Q', 'h'), create_card('Q', 'd'), 100,
//   create_card('A', 's'), create_card('A', 'd'), 100,
//   create_card('K', 's'), create_card('K', 'd'), 100,
//   create_card('Q', 'h'), create_card('Q', 'd'), 100
// };