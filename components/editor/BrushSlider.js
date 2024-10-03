import { optionColor } from '@/lib/colors'
import { useEffect, useRef } from 'react'

export default function BrushSlider({ range, frequencies, setFrequencies }) {
  const trackRef = useRef(null)
  const draggingIndexRef = useRef(null)
  const numMarkers = frequencies.length - 1

  const values = frequencies.reduce((acc, curr) => {
    acc.push((acc.length ? acc[acc.length - 1] : 0) + Number(curr))
    return acc
  }, [])

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  function handleMouseDown(i) {
    return () => {
      draggingIndexRef.current = i
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
  }

  function handleMouseUp() {
    draggingIndexRef.current = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  function handleMouseMove(event) {
    if (!trackRef.current || draggingIndexRef.current === null) {
      return null
    }

    const track = trackRef.current
    const trackRectangle = track.getBoundingClientRect()
    const newLeft = event.clientX - trackRectangle.left
    const newValue = Math.max(0, Math.min(1, newLeft / trackRectangle.width))
    const newValues = [...values]
    newValues[draggingIndexRef.current] = Math.round(1000 * newValue) / 10

    for (let i = draggingIndexRef.current; i < numMarkers; i++) {
      if (newValues[i] > newValues[i + 1]) {
        newValues[i + 1] = newValues[i]
      }
    }

    for (let i = draggingIndexRef.current; i > 0; i--) {
      if (newValues[i] < newValues[i - 1]) {
        newValues[i - 1] = newValues[i]
      }
    }

    const newFrequencies = newValues.map((value, i) =>
      String(Math.round(10 * (i === 0 ? value : value - newValues[i - 1])) / 10)
    )

    setFrequencies(newFrequencies)
  }
  
  return (
    <div className='py-6 px-5 flex items-center select-none'>
      <div
        ref={trackRef}
        className='relative h-1 w-full bg-neutral-600 grid'
        style={{ gridTemplateColumns: frequencies.reduce((acc, curr) => `${acc}${curr}% `, '') }}
      >
        {values.slice(0, -1).map((value, i) => (
          <div
            key={'marker' + i}
            className='absolute -top-2 h-5 w-[6px] bg-neutral-300 cursor-pointer'
            style={{ left: `calc(${value}% - 3px)`, zIndex: values.length - i }}
            onMouseDown={handleMouseDown(i)}
          />
        ))}
        {(range.options.length == frequencies.length) && frequencies.map((_, i) => (
          <div
            key={'track' + i}
            style={{ background: optionColor(range.options[i], range.spot) }}
          />
        ))}
      </div>
    </div>
  )
}