import { useState } from 'react'
import Button from '../_common_/Button'
import Input from '../_common_/Input'
import Anchor from '../_common_/Anchor'

export default function SignupRoot() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='min-h-screen p-3 flex justify-center items-center'>
      <form className='max-w-96 pt-12 pb-7 px-9 bg-neutral-900 rounded flex flex-col items-center'>
        <h1 className='font-decorative text-5xl text-neutral-700 mb-9'>
          HT
        </h1>
        <h3 className='font-medium text-2xl mb-4'>
          Hello
        </h3>
        <p className='text-neutral-500 mb-5'>
          Sign up using your email
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
            name='username'
            type='text'
            placeholder='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
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
            text='Sign Up'
            type='submit'
          />
        </div>
        <div className='flex items-center self-stretch gap-2 px-2'>
          <div className='flex-grow bg-neutral-600 h-[1px]'></div>
          <div className='text-xs text-neutral-400 tracking-wider'>OR</div>
          <div className='flex-grow bg-neutral-600 h-[1px]'></div>
        </div>
        <div className='pt-5 pb-7 self-stretch'>
          <Button
            utilClasses='w-full rounded-sm'
            text='Google'
          />
        </div>
        <p className='text-sm text-neutral-500'>
          Already have an account? <Anchor href='/login' text='Log in' /> instead.
        </p>
      </form>
    </div>
  )
}