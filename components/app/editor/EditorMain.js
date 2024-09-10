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
  const [selected, setSelected] = useState([])
  const [hovered, setHovered] = useState([])
  const [optionHover, setOptionHover] = useState(null)
  const [past, setPast] = useState([])
  const [future, setFuture] = useState([])
  const [error, setError] = useState(false)

  function setRangeWithUndo(newRange) {
    setPast((prev) => [...prev, range].slice(-50)) 
    setRange(newRange)
    setFuture([])
  }

  return !range ? null : (
    <>
      <div className='bg-neutral-900 border-r'>
        <Title />
        <Sidebar
          range={range}
          setRange={setRangeWithUndo}
          selected={selected}
          setSelected={setSelected}
          setHovered={setHovered}
          setOptionHover={setOptionHover}
          error={error}
          setError={setError}
        />
      </div>
      <div className='bg-neutral-900 grow'>
        <Toolbar
          range={range}
          setRange={setRange}
          past={past}
          setPast={setPast}
          future={future}
          setFuture={setFuture}
          error={error}
        />
        <div className='p-3'>
          <Matrix
            range={range}
            selected={selected}
            setSelected={setSelected}
            hovered={hovered}
            setHovered={setHovered}
            optionHover={optionHover}
          />
        </div>
      </div>
    </>
  )
}