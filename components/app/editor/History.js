import HistoryAction from './HistoryAction'

export default function History({ range, setRange }) {
  return (
    <div className='p-3'>
      <h1 className='text-sm text-neutral-400 mb-2'>
        History
      </h1>
      <div>
        {range.spot.blinds.map(action => (
          <HistoryAction
            key={'blind' + action.p}
            range={range}
            action={action}
          />
        ))}
        {range.history.map((action, i) => (
          <HistoryAction
            key={'action' + i}
            range={range}
            action={action}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}