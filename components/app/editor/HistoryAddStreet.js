import Button from '@/components/_common_/Button'
import { deck, sampleFromDeck } from '@/lib/shared/cards'
import { produce } from 'immer'
import { useState } from 'react'

export default function HistoryAddStreet({ spot, setRange, adjustDraftToNewHistory }) {
  const street = spot.state
  const n = street == 'flop' ? 3 : 1
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
    <div>
      {cards.map((_, i) => (
        <select
          key={'card' + i}
          name={String(i)}
          value={cards[i]}
          onChange={() => { handleChangeCard(i) }}
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
        text={`set ${street}`}
        onClick={handleAddStreet}
      />
    </div>
  )
}