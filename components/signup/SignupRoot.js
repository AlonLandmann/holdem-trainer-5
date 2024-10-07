import A from '@/components/_ui/A'
import Button from '@/components/_ui/Button'
import Input from '@/components/_ui/Input'
import googleAuthUrl from '@/lib/googleAuthUrl'
import { useState } from 'react'
import toast from 'react-hot-toast'
import AuthLayout from '../_layout/AuthLayout'

export default function SignupRoot() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleEmailSignup(event) {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return toast.error('Make sure to provide a valid email address.')
    }

    if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return toast.error('Password must contain at least 8 characters, one lowercase letter, one upper case letter, and one number.')
    }

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const json = await res.json()

    if (json.success) {
      window.location = '/app/dashboard'
    } else {
      toast.error(json.message || 'An unexpected error occurred.')
    }
  }

  return (
    <AuthLayout>
      <form className='max-w-96 pt-12 pb-7 px-11 border rounded flex flex-col items-center'>
        <h1 className='font-decorative text-5xl text-neutral-700 mb-9'>
          HT
        </h1>
        <h3 className='font-medium text-2xl mb-7'>
          Hello
        </h3>
        <p className='text-neutral-500 mb-4'>
          Sign up with your email
        </p>
        <div className='flex flex-col gap-3 w-full pb-5'>
          <Input
            name='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            utilClasses='w-full rounded-sm py-3 px-4'
            text='Sign Up'
            type='submit'
            onClick={handleEmailSignup}
            useQueue
          />
        </div>
        <div className='flex items-center self-stretch gap-2 px-2'>
          <div className='flex-grow bg-neutral-600 h-[1px]'></div>
          <div className='text-xs text-neutral-400 tracking-wider'>
            OR
          </div>
          <div className='flex-grow bg-neutral-600 h-[1px]'></div>
        </div>
        <div className='pt-5 pb-8 self-stretch'>
          <Button
            utilClasses='w-full rounded-sm py-3 px-4'
            text='Google'
            onClick={() => { window.location = googleAuthUrl }}
          />
        </div>
        <div className='text-sm text-neutral-500 px-2 flex gap-1'>
          Already have an account? <A href='/auth/login' text='Log in' /> instead.
        </div>
      </form>
    </AuthLayout>
  )
}