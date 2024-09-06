import Button from '@/components/_common_/Button'
import { useState } from 'react'

export default function TrainerMain() {
  const [sidebarInView, setSidebarInView] = useState(true)
  const [statsInView, setStatsInView] = useState(true)

  return (
    <div className='grow bg-neutral-900'>
      <div className='p-3 flex items-center border-b'>
        <h1 className='text-neutral-600'>
          Trainer
        </h1>
        <div className='flex gap-2 ml-auto'>
          <Button
            theme='tertiary'
            utilClasses='w-8 h-8 flex justify-center items-center'
            icon='ui-checks'
            onClick={() => { setSidebarInView(prev => !prev) }}
          />
          <Button
            theme='tertiary'
            utilClasses='w-8 h-8 flex justify-center items-center'
            icon='graph-up-arrow'
            onClick={() => { setStatsInView(prev => !prev) }}
          />
        </div>
      </div>
    </div>
  )
}