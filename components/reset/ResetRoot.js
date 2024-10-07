import { useState } from 'react'
import AuthLayout from '../_layout/AuthLayout'
import Button from '../_ui/Button'
import Input from '../_ui/Input'
import A from '../_ui/A'

export default function ResetRoot() {
  const [email, setEmail] = useState('')

  async function handleSendCode() {

  }

  return (
    <AuthLayout>
      <form className='max-w-96 pt-12 pb-7 px-11 border rounded flex flex-col items-center'>
        <h1 className='font-decorative text-5xl text-neutral-700 mb-9'>
          HT
        </h1>
        <h3 className='font-medium text-2xl mb-7'>
          Password Reset
        </h3>
        <p className='text-neutral-500 mb-4'>
          Enter your email below.
        </p>
        <div className='flex flex-col gap-3 w-full pb-5'>
          <Input
            name='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button
            utilClasses='w-full rounded-sm py-3 px-4'
            text='Send reset code'
            type='submit'
            onClick={handleSendCode}
            useQueue
          />
        </div>
        <div className='text-sm text-neutral-500 px-2 flex gap-1 mt-3'>
          Remember your password? <A href='/auth/login' text='Log in' /> instead.
        </div>
      </form>
    </AuthLayout>
  )
}