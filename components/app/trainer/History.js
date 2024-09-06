import Button from '@/components/_common_/Button'
import { spotInfo } from '@/lib/shared/spots'

export default function History({ range, spot, setSpot }) {
  const i = spot.history.length
  const N = range.history.length

  function handleBack() {
    setSpot(prev => spotInfo(range.stacks, prev.history.slice(0, -1)))
  }

  function handleForward() {
    setSpot(prev => spotInfo(range.stacks, range.history.slice(0, prev.history.length + 1)))
  }

  return (
    <div>
      <Button
        theme='tertiary'
        icon='chevron-left'
        disabled={i === 0}
        onClick={handleBack}
      />
      <Button
        theme='tertiary'
        icon='chevron-right'
        disabled={i === N}
        onClick={handleForward}
      />
    </div>
  )
}