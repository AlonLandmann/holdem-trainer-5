import { optionColor } from '@/lib/colors'
import { useEffect, useRef } from 'react'

export default function FrequencySlider({ frequency, setFrequency }) {
  const trackRef = useRef(null)
  const draggingIndexRef = useRef(null)
  const numMarkers = 1

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  function handleMouseDown() {
    draggingIndexRef.current = 0
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
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

    setFrequency(Math.round(1000 * newValue));
  }

  return (
    <div className='py-6 px-5 flex items-center select-none'>
      <div
        ref={trackRef}
        className='relative h-1 w-full bg-neutral-600 grid'
        style={{ gridTemplateColumns: `${frequency / 10}% ${(1000 - frequency) / 10}%` }}
      >
        <div
          className='absolute -top-2 h-5 w-[6px] bg-neutral-300 cursor-pointer'
          style={{ left: `calc(${frequency / 10}% - 3px)` }}
          onMouseDown={handleMouseDown}
        />
        {/* {(range.options.length == frequencies.length) && frequencies.map((_, i) => (
          <div
            key={'track' + i}
            style={{ background: optionColor(range.options[i], range.spot) }}
          />
        ))} */}
      </div>
    </div>
  )
}