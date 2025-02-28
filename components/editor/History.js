import Button from '@/components/_ui/Button'
import HistoryAction from '@/components/editor/HistoryAction'
import HistoryAddAction from '@/components/editor/HistoryAddAction'
import HistoryAddStreet from '@/components/editor/HistoryAddStreet'
import { positions, spotInfo, streets } from '@/lib/spots'
import { produce } from 'immer'
import { useState } from 'react'

export default function History({ range, setRange, error }) {
  const [mouseOver, setMouseOver] = useState(false)

  function adjustDraftToNewHistory(draft) {
    let allOptionsValid = true

    draft.spot = spotInfo(draft.stacks, draft.history)
    draft.options.forEach(option => {
      if (!draft.spot.options) {
        allOptionsValid = false
      } else if (!draft.spot.options.includes(option.type)) {
        allOptionsValid = false
      } else if (option.size && (option.size < draft.spot.min || option.size > draft.spot.max)) {
        allOptionsValid = false
      }
    })

    if (!allOptionsValid) {
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
  }

  function handleUndo() {
    setRange(produce(draft => {
      draft.history.pop()
      adjustDraftToNewHistory(draft)
    }))
  }

  return (
    <div
      className='relative border rounded py-3 px-4 flex flex-col'
      onMouseEnter={() => { setMouseOver(true) }}
      onMouseLeave={() => { setMouseOver(false) }}
    >
      {(error && mouseOver) &&
        <div
          className='absolute top-[1px] left-[1px] rounded-sm flex justify-center items-center gap-2 bg-neutral-900 z-10'
          style={{ height: 'calc(100% - 1px)', width: 'calc(100% - 1px)' }}
        >
          <i className='bi bi-lock'></i>
          <div>To edit history, enter valid stacks.</div>
        </div>
      }
      <div className='mb-3 flex items-center text-neutral-400'>
        <h1 className='mr-auto'>
          History
        </h1>
        <div className='flex gap-[6px] text-sm'>
          <i className='bi bi-database'></i>
          <span>{range.spot.pot}</span>
        </div>
        <div className='w-14 flex justify-end'>
          <Button
            theme='tertiary'
            utilClasses='py-[6px] px-[2px]'
            icon='arrow-left'
            onClick={handleUndo}
            disabled={!range.history.length}
          />
        </div>
      </div>
      <div className='mb-3 flex flex-col gap-[2px]'>
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
      {range.spot.state === 'showdown' &&
        <div className='px-2 py-1 text-center text-neutral-400'>
          showdown
        </div>
      }
      {range.spot.state === 'takedown' &&
        <div className='px-2 py-1 text-center text-neutral-400'>
          {positions[range.spot.hasFolded.findIndex(f => !f)]} wins
        </div>
      }
    </div>
  )
}