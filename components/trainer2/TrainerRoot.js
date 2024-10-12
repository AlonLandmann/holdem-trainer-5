import { useUser } from '@/hooks/useUser'
import { useState } from 'react'
import AppLayout from '../_layout/AppLayout'
import TrainerStartPage from './TrainerStartPage'
import TrainerSessionPage from './TrainerSessionPage'
import TrainerEndPage from './TrainerEndPage'

export default function TrainerRoot() {
  const [user, setUser] = useUser()
  const [page, setPage] = useState('start')

  return (
    <AppLayout>
      {user && !user.hasRanges &&
        <RangePlaceholder />
      }
      {user && user.hasRanges && page === 'start' &&
        <TrainerStartPage
          user={user}
          setPage={setPage}
        />
      }
      {user && user.hasRanges && page === 'session' &&
        <TrainerSessionPage
          user={user}
          setPage={setPage}
        />
      }
      {user && user.hasRanges && page === 'end' &&
        <TrainerEndPage
          user={user}
          setPage={setPage}
        />
      }
    </AppLayout>
  )
}