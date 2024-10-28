export default function RangeHistory({ range }) {
  return (
    <div className='text-neutral-600 mb-auto flex gap-2 z-40 max-w-[418px] truncate'>
      {range.history.map((action, i) => (
        <div key={'action' + i}>
          {action.cards
            ? <div>{action.cards.join(' ')}</div>
            : action.size
              ? action.size
              : action.type[0].toUpperCase()}
        </div>
      ))}
      {range.history.length === 0 &&
        <div>
          -
        </div>
      }
    </div>
  )
}