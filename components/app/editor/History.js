import { positions, spotInfo, streets } from '@/lib/shared/spots'
import HistoryAction from './HistoryAction'
import HistoryAddAction from './HistoryAddAction'
import HistoryAddStreet from './HistoryAddStreet'
import Button from '@/components/_common_/Button'
import { produce } from 'immer'

export default function History({ range, setRange, error }) {
  function adjustDraftToNewHistory(draft) {
    draft.spot = spotInfo(draft.stacks, draft.history)

    if (['fold / call', 'fold / call / raise'].includes(draft.spot.state)) {
      draft.options = [{ type: 'fold' }, { type: 'call' }]

      for (let i = 0; i < draft.matrix.length; i++) {
        draft.matrix[i].frequency = 1
        draft.matrix[i].strategy = [1, 0]
      }
    }

    if (draft.spot.state === 'check / bet') {
      draft.options = [{ type: 'check' }]

      for (let i = 0; i < draft.matrix.length; i++) {
        draft.matrix[i].frequency = 1
        draft.matrix[i].strategy = [1]
      }
    }
  }

  function handleUndo() {
    setRange(produce(draft => {
      draft.history.pop()
      adjustDraftToNewHistory(draft)
    }))
  }

  return (
    <div className='p-3'>
      <div>
        <h1 className='text-sm text-neutral-400 mb-2'>
          History
        </h1>
        <div>
          <i className='bi bi-database'></i>
          <span>{range.spot.pot}</span>
        </div>
        <Button
          theme='tertiary'
          icon='arrow-left'
          onClick={handleUndo}
          disabled={!range.history.length}
        />
      </div>
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
      {range.spot.options &&
        <HistoryAddAction
          spot={range.spot}
          setRange={setRange}
          adjustDraftToNewHistory={adjustDraftToNewHistory}
        />
      }
      {streets.includes(range.spot.state) &&
        <HistoryAddStreet
          spot={range.spot}
          setRange={setRange}
          adjustDraftToNewHistory={adjustDraftToNewHistory}
        />
      }
      {range.spot.state == 'showdown' &&
        <div>
          showdown
        </div>
      }
      {range.spot.state == 'takedown' &&
        <div>
          {positions[range.spot.hasFolded.findIndex(f => !f)]} wins
        </div>
      }
    </div>
  )
}