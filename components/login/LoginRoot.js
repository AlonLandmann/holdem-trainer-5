import Button from '@/components/_ui/Button'
import Input from '@/components/_ui/Input'
import A from '@/components/_ui/A'
import googleAuthUrl from '@/lib/googleAuthUrl'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function LoginRoot() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (router.query.googleAuth === 'fail') {
      toast.error('Google authentication failed.')
    }
  }, [router.query])

  async function handleEmailLogin(event) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const json = await res.json()

    if (json.success) {
      window.location = '/app/dashboard'
    } else {
      return toast.error(json.message || 'An unexpected error occurred.')
    }
  }

  return (
    <div className='min-h-screen bg-neutral-900 p-3 flex justify-center items-center'>
      <form className='max-w-96 pt-12 pb-7 px-11 border rounded flex flex-col items-center'>
        <h1 className='font-decorative text-5xl text-neutral-700 mb-9'>
          HT
        </h1>
        <h3 className='font-medium text-2xl mb-7'>
          Welcome Back
        </h3>
        <p className='text-neutral-500 mb-4'>
          Log in with your email
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
            text='Log In'
            type='submit'
            onClick={handleEmailLogin}
            useQueue
          />
          <div className='text-sm text-neutral-500 px-2 flex gap-1 mt-1 mb-2'>
            Forgot your password? <A href='/auth/reset' text='Click here' /> to reset it.
          </div>
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
          New to Hold'em Trainer? <A href='/auth/signup' text='Sign up' /> instead.
        </div>
      </form>
    </div>
  )
}