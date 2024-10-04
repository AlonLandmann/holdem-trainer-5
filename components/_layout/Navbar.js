import { useUser } from '@/hooks/useUser'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import A from '../_ui/A'
import Button from '../_ui/Button'

export default function Navbar() {
  const [user, setUser] = useUser()
  const [ddInView, setDdInView] = useState(false)

  const ddItemStyle = 'py-[15px] px-[22px] text-[15px] text-start md:py-[10px] md:px-[15px] md:text-sm hover:text-neutral-400'

  function handleMenuToggle() {
    setDdInView(prev => !prev)
  }

  async function handleResend() {
    const res = await fetch('/api/auth/resend', {
      method: 'POST',
      credentials: 'include',
    })

    const json = await res.json()

    if (!json.success) {
      return toast.error(json.message || 'An unexpected error occurred.')
    }

    toast.success('New verification link sent.')
  }

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
    <div className='sticky top-0 z-50 h-[40px] flex bg-[#171717f8] border-b'>
      <div className='mr-auto py-2 px-3 flex items-center font-decorative text-[17px]'>
        <A text='HT' href='/' />
      </div>
      <div
        className='py-2 px-3 flex items-center text-lg text-neutral-300 cursor-pointer hover:text-neutral-400'
        onClick={handleMenuToggle}
      >
        {ddInView
          ? <i className='bi bi-x-lg'></i>
          : <i className='bi bi-list'></i>
        }
      </div>
      {ddInView &&
        <div className='fixed w-full md:w-fit min-w-[200px] top-[40px] right-0 flex flex-col border-b border-l'>
          <A text='Ranges' href='/app/ranges' utilClasses={ddItemStyle} />
          <A text='Training' href='/app/trainer' utilClasses={ddItemStyle} />
          <A text='Academy' href='/academy' utilClasses={ddItemStyle} />
          {!user &&
            <A text='Log in' href='auth/login' utilClasses={ddItemStyle} />
          }
          {user &&
            <A text='Dashboard' href='/app/dashboard' utilClasses={ddItemStyle} />
          }
          {user &&
            <A text='Settings' href='/app/settings' utilClasses={ddItemStyle} />
          }
          {user && user.membership == 'free' &&
            <A text='HT-pro' href='/pricing' utilClasses={ddItemStyle} />
          }
          {user && !user.isVerified &&
            <Button
              theme='tertiary'
              utilClasses={ddItemStyle}
              text='Resend verification link'
              onClick={handleResend}
            />
          }
          {user &&
            <Button
              theme='tertiary'
              utilClasses={ddItemStyle}
              text='Log out'
              onClick={handleLogout}
            />
          }
        </div>
      }
    </div>
  )
}
