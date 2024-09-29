import { useUser } from '@/hooks/useUser'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Button from './Button'

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
    <div className='sticky top-0 z-100 h-[40px] flex bg-[#202020]'>
      <div className='mr-auto py-2 px-3 flex items-center font-decorative text-[17px]'>
        <Link href='/'>HT</Link>
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
        <div className='fixed w-full md:w-fit min-w-[200px] top-[40px] right-0 flex flex-col bg-[#242424]'>
          <Link href='/app/ranges' className={ddItemStyle}>
            Ranges
          </Link>
          <Link href='/app/trainer' className={ddItemStyle}>
            Training
          </Link>
          <Link href='/app/articles' className={ddItemStyle}>
            Academy
          </Link>
          {!user &&
            <Link href='auth/login' className={ddItemStyle}>
              Log in
            </Link>
          }
          {user &&
            <Link href='/app/dashboard' className={ddItemStyle}>
              Dashboard
            </Link>
          }
          {user &&
            <Link href='/app/settings' className={ddItemStyle}>
              Settings
            </Link>
          }
          {user && user.membership == 'free' &&
            <Link href='/pricing' className={ddItemStyle}>
              HT-pro
            </Link>
          }
          {user && !user.isVerified &&
            <button onClick={handleResend} className={ddItemStyle}>
              Resend verification link
            </button>
          }
          {user &&
            <button onClick={handleLogout} className={ddItemStyle}>
              Log out
            </button>
          }
        </div>
      }
    </div>
  )
}
