import SideNavItem from '@/components/_layout/SideNavItem'
import Button from '@/components/_ui/Button'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function SideNav() {
  const router = useRouter()
  const [extendedView, setExtendedView] = useState(() => {
    return router && router.query && router.query.extended
  })

  const groupStyle = 'flex flex-col gap-2 px-2 py-2'
  const separatorStyle = `
    h-[1px] ${extendedView ? 'w-32' : 'w-7'}
    bg-neutral-800 self-center my-2
  `

  async function handleLogout() {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })

    const json = await res.json()

    if (!json.success) {
      return toast.error(json.message || 'An unexpected error occurred.')
    }

    window.location = '/auth/login'
  }

  return (
    <>
      <div className={`${extendedView ? 'w-[58px]' : 'hidden'}`}></div>
      <div
        className={`
          h-screen ${extendedView ? 'w-40 absolute z-20' : 'w-[58px]'}
          flex flex-col bg-neutral-900 border-r
        `}
        onMouseEnter={() => { setExtendedView(true) }}
        onMouseLeave={() => { setExtendedView(false) }}
      >
        <div className={groupStyle}>
          <Button
            theme='tertiary'
            utilClasses={`
            px-3 py-2 text-base ${extendedView ? 'self-start' : ''}
            font-decorative text-neutral-600 hover:text-neutral-400
            `}
            text='HT'
            onClick={() => { router.push('/') }}
          />
          <SideNavItem
            icon='graph-up-arrow'
            extendedView={extendedView}
            text='Dashboard'
            href='/app/dashboard'
          />
        </div>
        <div className={separatorStyle}></div>
        <div className={groupStyle + ' mb-auto'}>
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
          {/* <SideNavItem
            icon='book'
            extendedView={extendedView}
            text='Academy'
            href='/academy'
          /> */}
        </div>
        <div className={separatorStyle}></div>
        <div className={groupStyle}>
          <SideNavItem
            icon='gear'
            extendedView={extendedView}
            text='Settings'
            href='/app/settings'
          />
          <SideNavItem
            icon='arrow-return-left'
            extendedView={extendedView}
            text='Logout'
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  )
}