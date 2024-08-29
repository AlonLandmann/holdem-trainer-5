import { useRouter } from 'next/router'
import Button from './Button'
import { useState } from 'react'
import SideNavItem from './SideNavItem'

export default function SideNav() {
  const router = useRouter()
  const [extendedView, setExtendedView] = useState(false)

  return (
    <div
      className={`h-screen ${extendedView ? 'w-40' : ''} flex flex-col bg-neutral-900 border-r`}
      onMouseEnter={() => { setExtendedView(true) }}
      onMouseLeave={() => { setExtendedView(false) }}
    >
      <div className='flex flex-col gap-3 px-3 py-5'>
        <Button
          theme='tertiary'
          utilClasses='px-3 py-2 text-base self-start font-decorative text-neutral-600 hover:text-neutral-400'
          text='HT'
          onClick={() => { router.push('/') }}
        />
        <SideNavItem
          icon='house-fill'
          extendedView={extendedView}
          text='Dashboard'
          href='/app/dashboard'
        />
      </div>
      <div className='h-[1px] w-7 bg-neutral-800 self-center'></div>
      <div className='flex flex-col gap-3 px-3 py-5 mb-auto'>
        <SideNavItem
          icon='ui-checks'
          extendedView={extendedView}
          text='Manager'
          href='/app/manager'
        />
        <SideNavItem
          icon='pen'
          extendedView={extendedView}
          text='Editor'
          href='/app/editor/dummy-range'
        />
        <SideNavItem
          icon='crosshair'
          extendedView={extendedView}
          text='Trainer'
          href='/app/trainer'
        />
      </div>
      <div className='h-[1px] w-7 bg-neutral-800 self-center'></div>
      <div className='flex flex-col gap-3 px-3 py-5'>
        <SideNavItem
          icon='gear'
          extendedView={extendedView}
          text='Settings'
          href='/app/settings'
        />
        <SideNavItem
          icon='person-circle'
          extendedView={extendedView}
          text='Logout'
        />
      </div>
    </div>
  )
}