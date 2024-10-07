import { useUser } from '@/hooks/useUser'
import { useState } from 'react'
import toast from 'react-hot-toast'
import A from '../_ui/A'
import Button from '../_ui/Button'

export default function InfoNavbar() {
  const [user, setUser, isLoading] = useUser()
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
      {!isLoading &&
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
                utilClasses='w-10 h-10 capitalize'
                text={user.username.slice(0, 2)}
                onClick={() => { setDdInView(prev => !prev) }}
              />
            }
          </div>
        </div>
      }
      {ddInView &&
        <div className={`
          fixed w-full top-14 right-0 flex flex-col
          bg-neutral-900 border-b ${user ? '' : 'md:border-hidden'}
        `}>
          <A
            text={user ? 'My Ranges' : 'Demo'}
            href='/app/manager'
            utilClasses=' p-5 text-start md:hidden'
          />
          <A
            text='Academy'
            href='/academy'
            utilClasses=' p-5 text-start md:hidden'
          />
          <A
            text={user ? 'HT - Pro' : 'Pricing'}
            href='/pricing'
            utilClasses=' p-5 text-start md:hidden'
          />
          {user &&
            <Button
              theme='link'
              text='Log out'
              onClick={handleLogout}
              utilClasses='p-5 text-start'
            />
          }
        </div>
      }
    </div>
  )
}
