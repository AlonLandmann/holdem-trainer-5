import { useState, useEffect } from 'react'

export default function useWindowDimensions() {
  const [dimensions, setDimensions] = useState([0, 0])

  useEffect(() => {
    function handleResize() {
      setDimensions([window.innerWidth, window.innerHeight])
    }

    if (typeof window !== 'undefined') {
      handleResize()
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return dimensions
}