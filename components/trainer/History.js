import Button from '@/components/_ui/Button'
import { actionInTrainerHistory } from '@/lib/display'
import { spotInfo } from '@/lib/spots'

export default function History({ range, spot, setSpot }) {
  const i = spot.history.length
  const N = range.history.length

  function handleBack() {
    setSpot(prev => spotInfo(range.stacks, prev.history.slice(0, -1)))
  }

  function handleForward() {
    setSpot(prev => spotInfo(range.stacks, range.history.slice(0, prev.history.length + 1)))
  }

  function handleDirectChoice(j) {
    setSpot(spotInfo(range.stacks, range.history.slice(0, j)))
  }

  return (
    <div className='flex gap-5'>
      <Button
        theme='tertiary'
        icon='chevron-left'
        disabled={i === 0}
        onClick={handleBack}
      />
      <div>
        <div className='flex gap-3'>
          {[{ cards: true }].concat(range.history).map((action, j) => (
            <div
              key={'action' + j}
              className={`${j === i ? 'text-neutral-200' : `text-neutral-600 transition
                cursor-pointer hover:text-neutral-400`}`}
              onClick={() => {handleDirectChoice(j)}}
            >
              {actionInTrainerHistory(action)}
            </div>
          ))}
        </div>
      </div>
      <Button
        theme='tertiary'
        icon='chevron-right'
        disabled={i === N}
        onClick={handleForward}
      />
    </div>
  )
}