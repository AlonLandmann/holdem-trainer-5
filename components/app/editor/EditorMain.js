import { useRouter } from 'next/router'
import { useState } from 'react'
import Matrix from './Matrix'
import Sidebar from './Sidebar'
import Toolbar from './Toolbar'
import Title from './Title'

export default function EditorMain({ user }) {
  const router = useRouter()
  const allRanges = user.folders.reduce((acc, curr) => acc.concat(curr.ranges), [])
  const selectedRange = allRanges.find(r => r.id === Number(router.query['range-id']))
  const [range, setRange] = useState(selectedRange)

  return !range ? null : (
    <>
      <div className='bg-neutral-900 border-r w-72 max-h-screen'>
        <Title />
        <Sidebar
          range={range}
          setRange={setRange}
        />
      </div>
      <div className='bg-neutral-900 grow'>
        <Toolbar range={range} />
        <div className='p-3'>
          <Matrix range={range} />
        </div>
      </div>
    </>
  )
}