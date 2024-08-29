import { useEffect, useState } from 'react'
import Button from '@/components/_common_/Button'
import Input from '@/components/_common_/Input'
import Anchor from '@/components/_common_/Anchor'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import googleAuthUrl from '@/lib/googleAuthUrl'

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
    event.preventDefault()

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const json = await res.json()

      if (json.success) {
        window.location = '/ranges'
      } else {
        return toast.error(json.message || 'An unexpected error occurred.')
      }
    } catch (error) {
      console.log(error)
      toast.error('An unexpected error occurred.')
    }
  }

  return (
    <div className='min-h-screen p-3 flex justify-center items-center'>
      <form className='max-w-96 pt-12 pb-7 px-11 bg-neutral-900 rounded flex flex-col items-center'>
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
            utilClasses='w-full rounded-sm'
            text='Log In'
            type='submit'
            onClick={handleEmailLogin}
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
        <div className='pt-5 pb-7 self-stretch'>
          <Button
            utilClasses='w-full rounded-sm'
            text='Google'
            onClick={() => { window.location = googleAuthUrl }}
          />
        </div>
        <p className='text-sm text-neutral-500 px-2'>
          New to Hold'em Trainer? <Anchor href='/auth/signup' text='Sign up' /> instead.
        </p>
      </form>
    </div>
  )
}