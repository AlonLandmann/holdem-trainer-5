import Button from '@/components/_common_/Button'

export default function RangeBanner({ range }) {
  return (
    <div className='flex p-2 bg-neutral-900 max-w-[1000px]'>
      <div className='min-w-36 h-36 bg-neutral-800 mr-3'></div>
      <div className='grow grid grid-cols-2 gap-2'>
        <div className=''>
          <div>
            {range.name}
          </div>
          <div>
            {JSON.stringify(range.history)}
          </div>
          <div>
            {JSON.stringify(range.options)}
          </div>
        </div>
        <div className='hidden lg:flex text-7xl text-neutral-800 justify-center items-center'>
          <i className='bi bi-graph-up-arrow'></i>
        </div>
      </div>
      <div className='flex flex-col gap-1 ml-5 pr-1 text-sm'>
        <Button
          theme='tertiary'
          icon='copy'
        />
        <Button
          theme='tertiary'
          icon='pen'
        />
        <Button
          theme='tertiary'
          icon='trash3'
        />
        <Button
          theme='tertiary'
          utilClasses='mt-auto text-xs'
          icon='square'
        />
        <Button
          theme='tertiary'
          icon='crosshair'
        />
      </div>
    </div>
  )
}