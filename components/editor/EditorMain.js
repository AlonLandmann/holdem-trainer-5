import Categories from '@/components/editor/Categories'
import Legend from '@/components/editor/Legend'
import Matrix from '@/components/editor/Matrix'
import Sidebar from '@/components/editor/Sidebar'
import Toolbar from '@/components/editor/Toolbar'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
      <div className='bg-neutral-900'>
        <div className='border-b border-r p-3 h-[49px]'>
          <h1 className='text-neutral-600'>
            Editor
          </h1>
        </div>
        <Sidebar
          range={range}
          setRange={setRangeWithUndo}
          selected={selected}
          setSelected={setSelected}
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
        <div className='flex'>
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
          <div className='flex flex-col gap-3 p-3'>
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
    </>
  )
}