import A from '../_ui/A'

export default function Footer() {
  return (
    <div className='border-t flex flex-col'>
      <div className={`
        py-5 px-8 grid grid-cols-1 gap-5 gap-y-8
        xs:py-10 xs:px-12 xs:grid-cols-2
        lg:grid-cols-4 lg:gap-y-5
      `}>
        <div className='flex flex-col'>
          <A href='/' text='HT' utilClasses='font-decorative text-2xl' />
          <div className='py-2 text-sm text-neutral-400'>
            info@holdem-trainer.com
          </div>
          <div className='mt-auto flex gap-4'>
            <A href='/' icon='youtube' utilClasses='text-xl' />
            <A href='/' icon='twitter-x' utilClasses='text-xl' />
            <A href='/' icon='discord' utilClasses='text-xl' />
          </div>
        </div>
        <div>
          <h1 className='mb-3 text-xl font-medium text-neutral-600'>
            App
          </h1>
          <div className='flex flex-col items-start gap-2 text-sm xs:text-base'>
            <A href='/app/manager' text='Manager' />
            <A href='/app/editor/dummyId' text='Editor' />
            <A href='/app/trainer' text='Trainer' />
          </div>
        </div>
        <div>
          <h1 className='mb-3 text-xl font-medium text-neutral-600'>
            Learn
          </h1>
          <div className='flex flex-col items-start gap-2 text-sm xs:text-base'>
            <A href='/academy' text='Principles' />
            <A href='/academy' text='Preflop' />
            <A href='/academy' text='Postflop' />
          </div>
        </div>
        <div>
          <h1 className='mb-3 text-xl font-medium text-neutral-600'>
            Info
          </h1>
          <div className='flex flex-col items-start gap-2 text-sm xs:text-base'>
            <A href='/pricing' text='HT-pro' />
            <A href='/support' text='Support' />
          </div>
        </div>
      </div>
      <div className={`
        py-5 px-8 self-start flex flex-col gap-4 text-xs
        xs:self-center xs:flex-row xs:py-4 xs:px-12
      `}>
        <div className='text-neutral-400'>
          © 2024 - A. Landmann
        </div>
        <div className='flex gap-3 flex-col xs:flex-row'>
          <A href='/support' text='FAQ' />
          <A href='/support' text='Privacy Policy' />
          <A href='/support' text='Terms & Conditions' />
        </div>
      </div>
    </div>
  )
}