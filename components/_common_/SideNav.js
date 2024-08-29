import Button from './Button'

export default function SideNav() {
  return (
    <div className='h-screen w-14 flex flex-col bg-neutral-900'>
      <div className='flex flex-col items-center gap-3 py-5'>
        <Button
          theme='tertiary'
          utilClasses='font-decorative text-neutral-600 hover:text-neutral-300'
          text='HT'
        />
        <Button
          theme='tertiary'
          utilClasses='w-8 h-8'
          icon='house-fill'
        />
      </div>
      <div className='h-[1px] w-7 bg-neutral-600 self-center'></div>
      <div className='flex flex-col items-center gap-3 py-5 mb-auto'>
        <Button
          theme='tertiary'
          utilClasses='w-8 h-8'
          icon='ui-checks'
        />
        <Button
          theme='tertiary'
          utilClasses='w-8 h-8'
          icon='pen'
        />
        <Button
          theme='tertiary'
          utilClasses='w-8 h-8'
          icon='crosshair'
        />
      </div>
      <div className='h-[1px] w-7 bg-neutral-600 self-center'></div>
      <div className='flex flex-col items-center gap-3 py-5'>
        <Button
          theme='tertiary'
          utilClasses='w-8 h-8'
          icon='gear'
        />
        <Button
          theme='tertiary'
          utilClasses='w-8 h-8'
          icon='person-circle'
        />
      </div>
    </div>
  )
}