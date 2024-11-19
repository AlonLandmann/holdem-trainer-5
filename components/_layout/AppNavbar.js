import AppNavbarItem from '@/components/_layout/AppNavbarItem'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import A from '../_ui/A'

export default function AppNavbar() {
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
      window.location = '/'
    } else {
      toast.error(json.message || 'An unexpected error occurred.')
    }
  }

  return (
    <>
      <div className='min-w-14'></div>
      <div
        className={`h-screen absolute z-20 ${extendedView ? 'w-40' : 'w-14'} flex flex-col bg-neutral-900 border-r transition-width`}
        onMouseEnter={() => { if (listenForEnter) { setExtendedView(true) } }}
        onMouseLeave={() => { setExtendedView(false) }}
      >
        <div className='flex flex-col gap-2 px-2 py-2'>
          <A
            href='/'
            text='HT'
            utilClasses='py-2 font-decorative w-[39px] justify-center'
          />
          <AppNavbarItem
            icon='graph-up-arrow'
            text='Overview'
            href='/app/overview'
            extendedView={extendedView}
          />
        </div>
        <div className={`h-[1px] ${extendedView ? 'w-32' : 'w-7'} bg-neutral-800 self-center my-2`}></div>
        <div className={'flex flex-col gap-2 px-2 py-2 mb-auto'}>
          <AppNavbarItem
            icon='ui-checks'
            text='Manager'
            href='/app/manager'
            extendedView={extendedView}
          />
          <AppNavbarItem
            icon='pen'
            text='Editor'
            href='/app/editor/first-range'
            extendedView={extendedView}
          />
          <AppNavbarItem
            icon='crosshair'
            text='Trainer'
            href='/app/trainer'
            extendedView={extendedView}
          />
          <AppNavbarItem
            icon='cpu'
            text='Solver'
            href='/app/solver'
            extendedView={extendedView}
          />
        </div>
        <div className={`h-[1px] ${extendedView ? 'w-32' : 'w-7'} bg-neutral-800 self-center my-2`}></div>
        <div className='flex flex-col gap-2 px-2 py-2'>
          <AppNavbarItem
            icon='gear'
            text='Settings'
            href='/app/settings'
            extendedView={extendedView}
          />
          <AppNavbarItem
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