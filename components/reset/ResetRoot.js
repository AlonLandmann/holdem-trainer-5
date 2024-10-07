import { useState } from 'react'
import AuthLayout from '../_layout/AuthLayout'
import Button from '../_ui/Button'
import Input from '../_ui/Input'
import A from '../_ui/A'
import toast from 'react-hot-toast'

export default function ResetRoot() {
  const [instructions, setInstructions] = useState('Enter your email below.')
  const [email, setEmail] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [codeEntered, setCodeEntered] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordCopy, setPasswordCopy] = useState('')

  async function handleSendCode() {
    const res = await fetch('/api/auth/reset-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const json = await res.json()

    if (json.success) {
      setCodeSent(true)
      setInstructions(`Enter the code sent to ${email}.`)
      toast.success(`A verification code has been sent to ${email}.`)
    } else {
      toast.error(json.message || 'An unexpected error occurred.')
    }
  }

  async function handleCodeSubmission() {
    const res = await fetch('/api/auth/check-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, codeInput }),
    })

    const json = await res.json()

    if (json.success) {
      setCodeEntered(true)
      setInstructions('Choose your new password.')
      toast.success('Code correct.')
    } else {
      toast.error(json.message || 'An unexpected error occurred.')
    }
  }

  async function handlePasswordReset() {
    
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
        <p className='text-neutral-500 mb-4 text-wrap text-center'>
          {instructions}
        </p>
        <div className='flex flex-col gap-3 w-full pb-5'>
          {!codeSent &&
            <Input
              name='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          }
          {!codeSent &&
            <Button
              utilClasses='w-full rounded-sm py-3 px-4'
              text='Send reset code'
              type='submit'
              onClick={handleSendCode}
              useQueue
            />
          }
          {codeSent && !codeEntered &&
            <Input
              name='code'
              value={codeInput}
              placeholder='6-digit Code'
              onChange={(e) => { setCodeInput(e.target.value) }}
            />
          }
          {codeSent && !codeEntered &&
            <Button
              utilClasses='w-full rounded-sm py-3 px-4'
              text='Send new code'
              type='submit'
              onClick={handleCodeSubmission}
              useQueue
            />
          }
          {codeEntered &&
            <Input
              name='password'
              type='password'
              value={password}
              placeholder='New password'
              onChange={(e) => { setPassword(e.target.value) }}
            />
          }
          {codeEntered &&
            <Input
              name='password'
              type='password'
              value={passwordCopy}
              placeholder='Re-enter password'
              onChange={(e) => { setPasswordCopy(e.target.value) }}
            />
          }
          {codeEntered &&
            <Button
              utilClasses='w-full rounded-sm py-3 px-4'
              text='Set new password'
              type='submit'
              onClick={handlePasswordReset}
              useQueue
            />
          }
        </div>
        <div className='text-sm text-neutral-500 px-2 flex gap-1 mt-3'>
          Remember your password? <A href='/auth/login' text='Log in' /> instead.
        </div>
      </form>
    </AuthLayout>
  )
}