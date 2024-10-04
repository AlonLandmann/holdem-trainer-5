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
    <div className='sticky top-0 z-50 h-14 px-5 flex justify-between items-center  bg-neutral-900 bg-opacity-90 border-b'>
      <A href='/' text='HT' utilClasses='font-decorative text-lg' />
      <Button theme='link' utilClasses='text-xl' icon={ddInView ? 'x-lg' : 'list'} onClick={() => { setDdInView(prev => !prev) }} />
      {ddInView &&
        <div className='fixed w-full sm:w-fit min-w-[200px] top-14 right-0 flex flex-col  bg-neutral-900 border-b sm:border-l'>
          <A href='/academy' text='Academy' utilClasses='py-4 px-6 text-start' />
          {!user && <A href='auth/login' text='Log in' utilClasses='py-4 px-6 text-start' />}
          <A href='/pricing' text='HT-pro' utilClasses='py-4 px-6 text-start' />
          {user && <Button theme='link' text='Log out' onClick={handleLogout} utilClasses='py-4 px-6 text-start' />}
        </div>
      }
    </div>
  )
}
