import Button from '@/components/_ui/Button'
import MatrixDisplay from '@/components/manager/MatrixDisplay'
import RangeHistory from '@/components/manager/RangeHistory'
import RangeLegend from '@/components/manager/RangeLegend'
import { useUser } from '@/hooks/useUser'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function RangeDisplayCard({ rangeId }) {
  const [user, setUser] = useUser()
  const [range, setRange] = useState(null)

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
    if (!user) {
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
      <MatrixDisplay range={range} />
      <div className='w-[418px] flex items-start justify-between gap-16'>
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