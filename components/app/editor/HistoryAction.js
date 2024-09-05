import { positions, spotInfo } from '@/lib/shared/spots'

export default function HistoryAction({ range, action, i = 0 }) {
  const isStreet = Boolean(action.cards)
  const localSpot = spotInfo(range.stacks, range.history.slice(0, i + 1))

  return (
    <div className='flex justify-between gap-1 text-neutral-400 text-sm'>
      <div className='text-neutral-600'>
        {isStreet
          ? action.type
          : positions[action.p]
        }
      </div>
      <div className='flex'>
        <div>
          {isStreet && action.cards.map((card, j) => (
            <div key={'card' + card + i + j}>
              {card}
            </div>
          ))}
          {!isStreet && (action.size
            ? `${action.size} bb`
            : action.type
          )}
        </div>
        <div className='text-neutral-600 w-14 text-right'>
          {isStreet
            ? localSpot.pot
            : Math.round(100000 * (localSpot.stacksAtRound[action.p] - localSpot.committedAtRound[action.p])) / 100000
          }
        </div>
      </div>
    </div>
  )
}