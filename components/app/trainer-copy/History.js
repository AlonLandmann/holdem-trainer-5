import css from '@/styles/trainer/History.module.scss'
import Button from '../_common_/Button'
import { spotInfo } from '@/lib/spots'
import { useEffect, useState } from 'react'

const CONTENT_WIDTH = 300 + 2

export default function History({ range, spot, setSpot, dims }) {
  const [translationDistance, setTranslationDistance] = useState(0)
  const N = range.history.length
  const i = spot.history.length

  const widthForContent = Math.max(180, Math.min(300, dims.w - 2 - 10 - 60 - 30))

  useEffect(() => {
    let w = 0

    for (let r = 0; r <= spot.history.length; r++) {
      w += document.getElementById(`action${r}`).clientWidth
    }

    setTranslationDistance(-Math.max(0, w - (widthForContent + 2)))
  }, [spot])

  function handleBack() {
    if (i > 0) {
      setSpot(prev => {
        return spotInfo(range.stacks, prev.history.slice(0, -1))
      })
    }
  }

  function handleForward() {
    if (i < N) {
      setSpot(prev => {
        const n = prev.history.length
        return spotInfo(range.stacks, range.history.slice(0, n + 1))
      })
    }
  }

  function handleDirectChoice(j) {
    setSpot(spotInfo(range.stacks, range.history.slice(0, j)))
  }

  return (
    <div className={css.container}>
      <Button
        theme='borderless'
        icon='chevron-left'
        disabled={i === 0}
        onClick={handleBack}
      />
      <div
        className={css.actionsContainer}
        style={{ width: `${widthForContent}px` }}
      >
        <div
          className={css.actions}
          style={{ transform: `translateX(${translationDistance}px)` }}
        >
          {[{ cards: true }].concat(range.history).map((action, j) => (
            <div
              id={'action' + j}
              key={'action' + j}
              className={j === i ? css.current : ''}
              onClick={() => { handleDirectChoice(j) }}
            >
              {action.cards
                ? '⋅'
                : action.size
                  ? action.size
                  : action.type[0].toUpperCase()}
            </div>
          ))}
        </div>
      </div>
      <Button
        theme='borderless'
        icon='chevron-right'
        disabled={i === N}
        onClick={handleForward}
      />
    </div>
  )
}
