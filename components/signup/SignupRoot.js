import Link from 'next/link'
import { useState } from 'react'

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
        <p className='text-neutral-500'>
          Sign up using google or via email
        </p>
        <button type='button'>
          Google
        </button>
        <input
          name='email'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          name='username'
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          name='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>
          sign up
        </button>
        <p className='text-sm text-neutral-500'>
          Already have an account? <Link href='/login'>Log in</Link> instead.
        </p>
      </form>
    </div>
  )
}