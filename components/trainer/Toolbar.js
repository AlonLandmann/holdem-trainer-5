import Button from '@/components/_ui/Button'

export default function Toolbar({ setSidebarInView, setStatsInView }) {
  return (
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
  )
}