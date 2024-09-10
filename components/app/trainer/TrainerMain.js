import { useEffect, useState } from 'react'
import Toolbar from './Toolbar'
import { useRouter } from 'next/router'
import { sample } from 'lodash'
import { rng } from '@/lib/shared/rounding'
import { sampleHoleCards } from '@/lib/shared/cards'
import History from './History'
import Table from './Table'
import Rng from './Rng'

export default function TrainerMain({ user }) {
  const [sidebarInView, setSidebarInView] = useState(true)
  const [statsInView, setStatsInView] = useState(true)
  const router = useRouter()
  const [ranges, setRanges] = useState(null)
  const [range, setRange] = useState(null)
  const [spot, setSpot] = useState(null)
  const [holeCards, setHoleCards] = useState(null)
  const [randomNumber, setRandomNumber] = useState(null)
  const [flash, setFlash] = useState(null)

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

    const loadedRange = sample(loadedRanges)

    setRanges(loadedRanges)
    setRange(loadedRange)
    setSpot(loadedRange.spot)
    setHoleCards(sampleHoleCards(loadedRange))
    setRandomNumber(rng())
  }, [router.isReady])

  return (
    <div className='grow bg-neutral-900'>
      <Toolbar
        setSidebarInView={setSidebarInView}
        setStatsInView={setStatsInView}
      />
      {range &&
        <div className='p-5 flex flex-col items-center gap-7'>
          <h1 className='text-xl'>
            {range.name}
          </h1>
          <History
            range={range}
            spot={spot}
            setSpot={setSpot}
          />
          <Table
            spot={spot}
            holeCards={holeCards}
            heroPosition={range.spot.p}
            flash={flash}
          />
          <Rng
            randomNumber={randomNumber}
          />
        </div>
      }
    </div>
  )
}