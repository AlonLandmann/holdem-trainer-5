import { deck } from '@/lib/cards';
import { produce } from 'immer'

export default function BoardSetting({ board, setBoard }) {
  function handleChangeCard(event, i) {
    setBoard(produce(draft => {
      draft[i] = event.target.value;
    }))
  }

  return (
    <div className='flex gap-1'>
      {board.map((c, i) => (
        <select
          key={caches}
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
    </div>
  )
}