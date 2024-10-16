import { useUser } from '@/hooks/useUser'
import { useEffect, useState } from 'react'
import AppLayout from '../_layout/AppLayout'
import TrainerStartPage from './TrainerStartPage'
import TrainerSessionPage from './TrainerSessionPage'
import TrainerEndPage from './TrainerEndPage'
import { useRouter } from 'next/router'

export default function TrainerRoot() {
  const router = useRouter()
  const [user, setUser] = useUser()
  const [page, setPage] = useState('start')
  const [selected, setSelected] = useState([])
  const [nrCombos, setNrCombos] = useState(20)
  const [stats, setStats] = useState([])

  useEffect(() => {
    if (router.query.ids) {
      setSelected(JSON.parse(router.query.ids))
    }
  }, [router.isReady])

  return (
    <AppLayout>
      {user && !user.hasRanges &&
        <RangePlaceholder />
      }
      {user && user.hasRanges && page === 'start' &&
        <TrainerStartPage
          user={user}
          setPage={setPage}
          selected={selected}
          setSelected={setSelected}
          nrCombos={nrCombos}
          setNrCombos={setNrCombos}
        />
      }
      {user && user.hasRanges && page === 'session' &&
        <TrainerSessionPage
          user={user}
          setPage={setPage}
          selected={selected}
          nrCombos={nrCombos}
          stats={stats}
          setStats={setStats}
        />
      }
      {user && user.hasRanges && page === 'end' &&
        <TrainerEndPage
          user={user}
          setPage={setPage}
          stats={stats}
          setStats={setStats}
        />
      }
    </AppLayout>
  )
}