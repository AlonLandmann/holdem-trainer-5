import Button from '@/components/_ui/Button'
import { deck, sampleFromDeck } from '@/lib/cards'
import { produce } from 'immer'
import { useState } from 'react'

export default function HistoryAddStreet({ spot, setRange, adjustDraftToNewHistory }) {
  const street = spot.state
  const n = street === 'flop' ? 3 : 1
  const [cards, setCards] = useState(sampleFromDeck(n, spot.board))

  function handleChangeCard(event, i) {
    setCards(produce(draft => {
      draft[i] = event.target.value
    }))
  }

  function handleAddStreet() {
    setRange(produce(draft => {
      draft.history.push({ type: street, cards })
      adjustDraftToNewHistory(draft)
    }))
  }

  return (
    <div className='flex justify-center gap-1'>
      {cards.map((_, i) => (
        <select
          key={'card' + i}
          className='w-14 appearance-none'
          name={String(i)}
          value={cards[i]}
          onChange={e => handleChangeCard(e, i)}
        >
          {deck.map((card => (
            <option
              key={'card-' + i + '-' + card}
              disabled={[...spot.board, ...cards.filter((_, j) => (i !== j))].includes(card)}
              value={card}
            >
              {card}
            </option>
          )))}
        </select>
      ))}
      <Button
        theme='secondary'
        utilClasses='px-3 py-0'
        text={`set ${street}`}
        onClick={handleAddStreet}
      />
    </div>
  )
}