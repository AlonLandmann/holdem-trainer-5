import { useEffect, useState } from 'react'
import Toolbar from './Toolbar'
import { useRouter } from 'next/router'
import { sample } from 'lodash'

export default function TrainerMain({ user }) {
  const [sidebarInView, setSidebarInView] = useState(true)
  const [statsInView, setStatsInView] = useState(true)
  const router = useRouter()
  const [ranges, setRanges] = useState([])
  const [range, setRange] = useState(sample())

  useEffect(() => {
    const ids = router.query.ids ? JSON.parse(router.query.ids) : []
    const loadedRanges = []

    user.folders.forEach(folder => {
      folder.ranges.forEach(range => {
        if (ids.includes(range.id)) {
          loadedRanges.push(range)
        }
      })
    })

    setRanges(loadedRanges)
    setRange(sample(loadedRanges))
  }, [router.isReady])

  return (
    <div className='grow bg-neutral-900'>
      <Toolbar
        setSidebarInView={setSidebarInView}
        setStatsInView={setStatsInView}
      />
      {range &&
        <div>
          <h1>
            {range.name}
          </h1>
        </div>
      }
    </div>
  )
}