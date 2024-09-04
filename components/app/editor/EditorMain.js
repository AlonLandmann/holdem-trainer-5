import Button from '@/components/_common_/Button'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Matrix from './Matrix'

export default function EditorMain({ user }) {
  const router = useRouter()
  const allRanges = user.folders.reduce((acc, curr) => acc.concat(curr.ranges), [])
  const selectedRange = allRanges.find(r => r.id === Number(router.query['range-id']))
  const [range, setRange] = useState(selectedRange)

  return !range ? null : (
    <>
      <div className='bg-neutral-900 border-r w-72'>
        <div className='border-b p-3'>
          <h1 className='text-neutral-600'>
            Editor
          </h1>
        </div>
        <div className='overflow-auto'>

        </div>
      </div>
      <div className='bg-neutral-900 grow'>
        <div className='border-b p-3 flex gap-3'>
          <h1 className='text-neutral-500 mr-auto'>
            {range.name}
          </h1>
          <Button
            theme='tertiary'
            utilClasses='text-neutral-500 hover:text-neutral-300'
            icon='arrow-counterclockwise'
          />
          <Button
            theme='tertiary'
            utilClasses='text-neutral-500 hover:text-neutral-300'
            icon='arrow-clockwise'
          />
          <Button
            theme='tertiary'
            utilClasses='text-neutral-500 hover:text-neutral-300'
            icon='floppy'
          />
        </div>
        <div>
          <Matrix
            range={range}
          />
        </div>
      </div>
    </>
  )
}