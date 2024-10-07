import { useUser } from '@/hooks/useUser'
import { useState } from 'react'
import toast from 'react-hot-toast'
import A from '../_ui/A'
import Button from '../_ui/Button'

export default function InfoNavbar() {
  const [user, setUser] = useUser()
  const [ddInView, setDdInView] = useState(false)

  async function handleResend() {
    const res = await fetch('/api/auth/resend', { method: 'POST', credentials: 'include' })
    const json = await res.json()

    if (json.success) {
      toast.success('New verification link sent.')
    } else {
      toast.error(json.message || 'An unexpected error occurred.')
    }
  }

  async function handleLogout() {
    const res = await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    const json = await res.json()

    if (json.success) {
      window.location = '/auth/login'
    } else {
      return toast.error(json.message || 'An unexpected error occurred.')
    }
  }

  return (
    <div className='sticky top-0 z-50 h-14 flex justify-between bg-neutral-900 bg-opacity-90 border-b'>
      <div className='px-5 flex items-center gap-5'>
        <A href='/' text='HT' utilClasses='font-decorative text-lg' />
        <h1 className='text-neutral-500 hidden lg:block'>
          Hold'em Trainer
        </h1>
      </div>
      <div className='flex items-center px-3'>
        <div className='hidden md:flex gap-8 mr-7'>
          <A
            text={user ? 'My Ranges' : 'Demo'}
            href='/app/manager'
            utilClasses=' transition text-sm font-medium'
          />
          <A
            text='Academy'
            href='/academy'
            utilClasses=' transition text-sm font-medium'
          />
          <A
            text={user ? 'HT - Pro' : 'Pricing'}
            href='/pricing'
            utilClasses=' transition text-sm font-medium'
          />
        </div>
        <div className='flex gap-4'>
          {true &&
            <Button
              theme='link'
              utilClasses='md:hidden'
              icon='three-dots-vertical'
              onClick={() => { setDdInView(prev => !prev) }}
            />
          }
          {!user &&
            <Button
              theme='nice'
              utilClasses='py-3 px-4'
              text='Log in'
              onClick={() => { window.location = '/auth/login' }}
            />
          }
          {user &&
            <Button
              theme='nice'
              utilClasses='w-10 h-10'
              text={user.username.slice(0, 2).toUpperCase()}
            />
          }
        </div>
      </div>
      {ddInView &&
        <div className='fixed w-full sm:w-fit min-w-[200px] top-14 right-0 flex flex-col  bg-neutral-900 border-b sm:border-l'>
          <A href='/academy' text='Academy' utilClasses='py-4 px-6 text-start' />
          {!user &&
            <A href='auth/login' text='Log in' utilClasses='py-4 px-6 text-start' />
          }
          <A href='/pricing' text='HT-pro' utilClasses='py-4 px-6 text-start' />
          {user &&
            <Button theme='link' text='Log out' onClick={handleLogout} utilClasses='py-4 px-6 text-start' />
          }
        </div>
      }
    </div>
  )
}
