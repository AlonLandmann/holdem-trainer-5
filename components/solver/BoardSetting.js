import { deck } from '@/lib/cards';
import { produce } from 'immer'

export default function BoardSetting({ street, board, setBoard }) {
  const n = street > 0 ? street + 2 : 0

  function handleChangeCard(event, i) {
    setBoard(produce(draft => {
      draft[i] = event.target.value;
    }))
  }

  return (
    <div className='flex gap-1'>
      {board.slice(0, n).map((c, i) => (
        <select
          key={c}
          className='w-14 appearance-none'
          value={c}
          onChange={e => handleChangeCard(e, i)}
        >
          {deck.map((card => (
            <option
              key={'card-' + i + '-' + card}
              disabled={board.includes(card)}
              value={card}
            >
              {card}
            </option>
          )))}
        </select>
      ))}
      {board.slice(n).map((_, i) => (
        <div
          key={'covered' + i}
          className='w-14 bg-neutral-800 rounded-sm'
        >

        </div>
      ))}
    </div>
  )
}