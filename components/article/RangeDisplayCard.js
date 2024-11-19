import Button from '@/components/_ui/Button'
import MatrixDisplay from '@/components/manager/MatrixDisplay'
import RangeHistory from '@/components/manager/RangeHistory'
import RangeLegend from '@/components/manager/RangeLegend'
import { useUserData } from '@/hooks/useUserData'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function RangeDisplayCard({ rangeId }) {
  const [user, loaded] = useUserData()
  const [range, setRange] = useState(null)
  const [cellWidth, setCellWidth] = useState(8)
  const [width, height] = useWindowDimensions()

  useEffect(() => {
    if (width) {
      if (width < 370) {
        setCellWidth(5)
      } else if (width < 422) {
        setCellWidth(6)
      } else if (width < 474) {
        setCellWidth(7)
      } else {
        setCellWidth(8)
      }
    }
  }, [width])

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/ranges/${rangeId}`)
      const json = await res.json()

      if (json.success) {
        setRange(json.range)
      } else {
        toast.error(json.message || 'An unexpected error occurred.')
      }
    })()
  }, [rangeId])

  async function handleDuplicate() {
    if (!loaded.info) {
      window.location = '/auth/login'
    } else if (range) {
      const res = await fetch('/api/ranges/duplicate-from-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(range)
      })

      const json = await res.json()

      if (json.success) {
        toast.success('Range has been added to your repertoire.')
      } else {
        toast.error(json.message || 'An unexpected error occurred.')
      }
    }
  }

  return !range ? <div>loading....</div> : (
    <div className='relative'>
      <h1 className='text-lg'>
        {range.name}
      </h1>
      <RangeHistory range={range} />
      <MatrixDisplay
        range={range}
        cellWidth={cellWidth}
      />
      <div className='flex flex-col gap-1 xs:items-start justify-between xs:flex-row xs:gap-16'>
        <RangeLegend range={range} />
        <div className='flex items-center gap-1 py-1'>
          <Button
            theme='nice'
            utilClasses='py-3 px-4 rounded-sm'
            icon='copy'
            text='Duplicate'
            onClick={handleDuplicate}
            useQueue
          />
        </div>
      </div>
    </div>
  )
}