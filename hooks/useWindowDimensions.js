import { useState, useEffect } from 'react'

export default function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 })

  useEffect(() => {
    function handleResize() {
      setWindowDims({ w: window.innerWidth, h: window.innerHeight })
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