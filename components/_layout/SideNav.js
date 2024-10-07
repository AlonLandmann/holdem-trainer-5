import SideNavItem from '@/components/_layout/SideNavItem'
import Button from '@/components/_ui/Button'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import A from '../_ui/A'

export default function SideNav() {
  const [extendedView, setExtendedView] = useState(false)
  const [listenForEnter, setListenForEnter] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => { setListenForEnter(true) }, 200)
    return () => clearTimeout(timer)
  }, [])

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
      <div className='min-w-14'></div>
      <div
        className={`h-screen absolute z-20 ${extendedView ? 'w-40' : 'w-14'} flex flex-col bg-neutral-900 border-r`}
        onMouseEnter={() => { if (listenForEnter) { setExtendedView(true) } }}
        onMouseLeave={() => { setExtendedView(false) }}
        style={{ transition: 'width 200ms' }}
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