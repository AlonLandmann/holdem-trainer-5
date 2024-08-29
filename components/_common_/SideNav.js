import { useRouter } from 'next/router'
import Button from './Button'

export default function SideNav() {
  const router = useRouter()

  return (
    <div className='h-screen w-14 flex flex-col bg-neutral-900'>
      <div className='flex flex-col items-center gap-3 py-5'>
        <Button
          theme='tertiary'
          utilClasses='font-decorative text-neutral-600 hover:text-neutral-300'
          text='HT'
          onClick={() => { router.push('/') }}
        />
        <Button
          theme='tertiary'
          utilClasses='w-8 h-8'
          icon='house-fill'
          onClick={() => { router.push('/app/dashboard') }}
        />
      </div>
      <div className='h-[1px] w-7 bg-neutral-600 self-center'></div>
      <div className='flex flex-col items-center gap-3 py-5 mb-auto'>
        <Button
          theme='tertiary'
          utilClasses='w-8 h-8'
          icon='ui-checks'
          onClick={() => { router.push('/app/manager') }}
        />
        <Button
          theme='tertiary'
          utilClasses='w-8 h-8'
          icon='pen'
          onClick={() => { router.push('/app/editor/dummy-range') }}
        />
        <Button
          theme='tertiary'
          utilClasses='w-8 h-8'
          icon='crosshair'
          onClick={() => { router.push('/app/trainer') }}
        />
      </div>
      <div className='h-[1px] w-7 bg-neutral-600 self-center'></div>
      <div className='flex flex-col items-center gap-3 py-5'>
        <Button
          theme='tertiary'
          utilClasses='w-8 h-8'
          icon='gear'
          onClick={() => { router.push('/app/settings') }}
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