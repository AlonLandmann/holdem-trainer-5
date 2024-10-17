import Brush from '@/components/editor/Brush'
import Categories from '@/components/editor/Categories'
import History from '@/components/editor/History'
import Legend from '@/components/editor/Legend'
import Matrix from '@/components/editor/Matrix'
import Predecessor from '@/components/editor/Predecessor'
import Stacks from '@/components/editor/Stacks'
import Toolbar from '@/components/editor/Toolbar'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function EditorMain({ user, setViewHotkeyInfo }) {
  const router = useRouter()
  const allRanges = user.folders.reduce((acc, curr) => acc.concat(curr.ranges), [])
  const selectedRange = allRanges.find(r => r.id === Number(router.query['range-id']))
  const [range, setRange] = useState(selectedRange || allRanges[0])
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
    <div className='grow'>
      <Toolbar
        allRanges={allRanges}
        range={range}
        setRange={setRange}
        past={past}
        setPast={setPast}
        future={future}
        setFuture={setFuture}
        error={error}
        setViewHotkeyInfo={setViewHotkeyInfo}
        settings={user.settings}
      />
      <div className='flex p-3 gap-3'>
        <div
          className='flex flex-col gap-3 overflow-y-auto no-scrollbar'
          style={{ maxHeight: 'calc(100vh - 49px - 24px)' }}
        >
          <Stacks
            range={range}
            setRange={setRangeWithUndo}
            setError={setError}
          />
          <History
            range={range}
            setRange={setRangeWithUndo}
            error={error}
          />
          <Predecessor
            range={range}
            setRange={setRangeWithUndo}
          />
          <Brush
            range={range}
            setRange={setRangeWithUndo}
            selected={selected}
            setSelected={setSelected}
            setOptionHover={setOptionHover}
            settings={user.settings}
          />
        </div>
        <Matrix
          range={range}
          selected={selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
          optionHover={optionHover}
        />
        <div
          className='flex flex-col gap-3 overflow-y-auto no-scrollbar'
          style={{ maxHeight: 'calc(100vh - 49px - 24px)' }}
        >
          <Categories
            range={range}
            setSelected={setSelected}
            setHovered={setHovered}
          />
          <Legend
            range={range}
            setSelected={setSelected}
            setHovered={setHovered}
          />
        </div>
      </div>
    </div>
  )
}