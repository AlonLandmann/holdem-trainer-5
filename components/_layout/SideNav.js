import SideNavItem from '@/components/_layout/SideNavItem'
import Button from '@/components/_ui/Button'
import { useState } from 'react'
import toast from 'react-hot-toast'
import A from '../_ui/A'

export default function SideNav() {
  const [extendedView, setExtendedView] = useState(false)
  
  async function handleLogout() {
    const res = await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    const json = await res.json()
    
    if (json.success) {
      window.location = '/auth/login'
    } else {
      toast.error(json.message || 'An unexpected error occurred.')
    }
  }
  
  const groupStyle = 'flex flex-col gap-2 px-2 py-2'
  const separatorStyle = `h-[1px] ${extendedView ? 'w-32' : 'w-7'} bg-neutral-800 self-center my-2`

  return (
    <>
      <div className={`${extendedView ? 'w-[58px]' : 'hidden'}`}></div>
      <div
        className={`h-screen ${extendedView ? 'w-40 absolute z-20' : 'w-[58px]'} flex flex-col bg-neutral-900 border-r`}
        onMouseEnter={() => { setExtendedView(true) }}
        onMouseLeave={() => { setExtendedView(false) }}
      >
        <div className={groupStyle}>
          <A
            href='/'
            text='HT'
            utilClasses={`px-3 py-2 font-decorative ${extendedView ? 'self-start' : ''} `}
          />
          <SideNavItem
            icon='graph-up-arrow'
            text='Dashboard'
            href='/app/dashboard'
            extendedView={extendedView}
          />
        </div>
        <div className={separatorStyle}></div>
        <div className={groupStyle + ' mb-auto'}>
          <SideNavItem
            icon='ui-checks'
            text='Manager'
            href='/app/manager'
            extendedView={extendedView}
          />
          <SideNavItem
            icon='pen'
            text='Editor'
            href='/app/editor/dummy-range'
            extendedView={extendedView}
          />
          <SideNavItem
            icon='crosshair'
            text='Trainer'
            href='/app/trainer'
            extendedView={extendedView}
            />
          <SideNavItem
            icon='book'
            text='Academy'
            href='/academy'
            extendedView={extendedView}
          />
        </div>
        <div className={separatorStyle}></div>
        <div className={groupStyle}>
          <SideNavItem
            icon='gear'
            text='Settings'
            href='/app/settings'
            extendedView={extendedView}
          />
          <SideNavItem
            icon='arrow-return-left'
            text='Logout'
            onClick={handleLogout}
            extendedView={extendedView}
          />
        </div>
      </div>
    </>
  )
}