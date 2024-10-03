import { positions, spotInfo } from '@/lib/spots'

export default function HistoryAction({ range, action, i = 0 }) {
  const isStreet = Boolean(action.cards)
  const localSpot = spotInfo(range.stacks, range.history.slice(0, i + 1))

  return (
    <div className='flex justify-between gap-1 text-neutral-400'>
      <div className='text-neutral-600 lowercase'>
        {isStreet
          ? action.type
          : positions[action.p]
        }
      </div>
      <div className='flex'>
        <div className='flex gap-1'>
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
            ? '-'
            : Math.round(100000 * (localSpot.stacksAtRound[action.p] - localSpot.committedAtRound[action.p])) / 100000
          }
        </div>
      </div>
    </div>
  )
}