import { useUser } from '@/hooks/useUser'
import A from '../_ui/A'

export default function InfoFooter() {
  const [user, setUser] = useUser()

  return (
    <div className='border-t flex flex-col'>
      <div className={`
        p-7 grid grid-cols-1 gap-5 gap-y-8
        xs:p-10 xs:grid-cols-2
        lg:grid-cols-4 lg:gap-y-5
      `}>
        <div className='flex flex-col'>
          <A href='/' text='HT' utilClasses='font-decorative text-2xl' />
          <div className='py-2 text-sm text-neutral-400'>
            info@holdem-trainer.com
          </div>
          <div className='mt-auto flex gap-4'>
            <A href='https://youtu.be/idgX7AKXh8c' icon='youtube' utilClasses='text-xl' />
            <A href='/' icon='twitter-x' utilClasses='text-xl' />
            <A href='https://discord.gg/SJ8wxuWVWW' icon='discord' utilClasses='text-xl' />
          </div>
        </div>
        <div>
          <h1 className='mb-3 text-xl font-medium text-neutral-600'>
            Features
          </h1>
          <div className='flex flex-col items-start gap-2 text-sm xs:text-base'>
            <A href='/app/manager' text='Manager' />
            <A href='/app/editor/dummyId' text='Editor' />
            <A href='/app/trainer' text='Trainer' />
            <A href='/academy' text='Academy' />
          </div>
        </div>
        <div>
          <h1 className='mb-3 text-xl font-medium text-neutral-600'>
            Info
          </h1>
          <div className='flex flex-col items-start gap-2 text-sm xs:text-base'>
            <A href='/pricing' text='HT-Pro' />
            <A href='/support/contact' text='Contact' />
            <A href='/support/faq' text='FAQ' utilClasses='tracking-wider' />
          </div>
        </div>
        <div>
          <h1 className='mb-3 text-xl font-medium text-neutral-600'>
            Account
          </h1>
          <div className='flex flex-col items-start gap-2 text-sm xs:text-base'>
            {user &&
              <A href='/app/overview' text='Overview' />
            }
            {user &&
              <A href='/app/settings' text='Settings' />
            }
            {!user &&
              <A href='/auth/login' text='Login' />
            }
            {!user &&
              <A href='/auth/signup' text='Signup' />
            }
          </div>
        </div>
      </div>
      <div className={`
        py-5 px-7 self-start flex flex-col gap-4 text-xs
        xs:self-center xs:flex-row xs:py-4 xs:px-10
      `}>
        <div className='text-neutral-400'>
          © 2024 - A. Landmann
        </div>
        <div className='flex gap-3 flex-col xs:flex-row'>
          <A href='/support/faq' text='FAQ' />
          <A href='/support/terms-and-conditions' text='Terms & Conditions' />
          <A href='/support/privacy-policy' text='Privacy Policy' />
        </div>
      </div>
    </div>
  )
}