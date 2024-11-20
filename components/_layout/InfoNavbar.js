import { useState } from 'react'
import toast from 'react-hot-toast'
import A from '../_ui/A'
import Button from '../_ui/Button'
import { usePlausible } from 'next-plausible'
import { useUserData } from '@/hooks/useUserData'
import { useRouter } from 'next/router'

export default function InfoNavbar({ isHome = false }) {
  const [user, loaded] = useUserData()
  const router = useRouter()
  const [ddInView, setDdInView] = useState(false)
  const plausible = usePlausible()

  async function handleLogout() {
    const res = await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    const json = await res.json()

    if (json.success) {
      window.location = '/'
    } else {
      return toast.error(json.message || 'An unexpected error occurred.')
    }
  }

  return (
    <div className='sticky top-0 z-50 h-14 flex justify-between bg-neutral-900 bg-opacity-90 border-b'>
      <div className='px-5 flex items-center gap-5'>
        <A
          href='/'
          text='HT'
          utilClasses='font-decorative text-lg'
        />
        <h1 className='text-neutral-500 hidden lg:block'>
          Hold'em Trainer
        </h1>
      </div>
      <div className='flex items-center px-3'>
        <div className='hidden md:flex gap-8 mr-7'>
          {user.info &&
            <A
              text={'My Ranges'}
              href='/app/manager'
              utilClasses=' transition text-sm font-medium'
            />
          }
          {/* <A
              text='Academy'
              href='/academy'
              utilClasses=' transition text-sm font-medium'
            />
            <A
              text={user.info ? 'HT - Pro' : 'Pricing'}
              href='/pricing'
              utilClasses=' transition text-sm font-medium'
            /> */}
        </div>
        <div className='flex gap-4'>
          {!user.info && !isHome &&
            <Button
              theme='link'
              utilClasses='md:hidden'
              icon='three-dots-vertical'
              onClick={() => { setDdInView(prev => !prev) }}
            />
          }
          {!user.info && !isHome &&
            <Button
              theme='nice'
              utilClasses='py-3 px-4'
              text='Log in'
              onClick={() => { router.push('/auth/login') }}
            />
          }
          {!user.info && isHome &&
            <div className='flex items-center gap-2'>
              <Button
                theme='secondary'
                utilClasses='py-3 px-4'
                text='Log in'
                onClick={() => {
                  plausible('navbarLoginCtaClicked');
                  router.push('/auth/login');
                }}
              />
              <Button
                theme='nice'
                utilClasses='py-3 px-4'
                text='Create free account'
                onClick={() => {
                  plausible('navbarCreateAccountCtaClicked');
                  router.push('/auth/signup');
                }}
              />
            </div>
          }
          {user.info &&
            <Button
              theme='nice'
              utilClasses='w-10 h-10 capitalize'
              text={user.info.username.slice(0, 2)}
              onClick={() => { setDdInView(prev => !prev) }}
            />
          }
        </div>
      </div>
      {ddInView &&
        <div className={`
          fixed w-full top-14 right-0 flex flex-col
          bg-neutral-900 border-b ${user.info ? '' : 'md:border-hidden'}
        `}>
          {user.info &&
            <A
              text='My Ranges'
              href='/app/manager'
              utilClasses=' p-5 text-start md:hidden'
            />
          }
          {/* <A
            text='Academy'
            href='/academy'
            utilClasses=' p-5 text-start md:hidden'
          />
          <A
            text={user.info ? 'HT - Pro' : 'Pricing'}
            href='/pricing'
            utilClasses=' p-5 text-start md:hidden'
          /> */}
          {user.info &&
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
