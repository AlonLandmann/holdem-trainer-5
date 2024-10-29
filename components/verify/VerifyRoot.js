import { useRouter } from 'next/router'
import AuthLayout from '../_layout/AuthLayout'
import { useEffect, useState } from 'react'
import Button from '../_ui/Button'

export default function VerifyRoot() {
  const router = useRouter()
  const [status, setStatus] = useState(null)

  useEffect(() => {
    (async () => {
      const { token } = router.query

      if (token) {
        const res = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        })

        const json = await res.json()
        setStatus(json.success ? 'Verification successful' : 'Verification failed')
      }
    })()
  }, [router.isReady])

  return (
    <AuthLayout>
      <div className='p-4 overflow-hidden'>
        <div className='max-w-96 pt-12 pb-7 px-11 border rounded flex flex-col items-center'>
          <h1 className='font-decorative text-5xl text-neutral-700 mb-9'>
            HT
          </h1>
          <h3 className='font-medium text-2xl mb-7'>
            {status}
          </h3>
          <Button
            utilClasses='w-full rounded-sm py-3 px-4'
            text='Back to login'
            onClick={() => { router.push('/auth/login') }}
          />
        </div>
      </div>
    </AuthLayout>
  )
}
