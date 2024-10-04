import A from '../_ui/A'

export default function Footer() {
  return (
    <div className='bg-[#171717] border-t flex flex-col'>
      <div className={`
        py-[20px] px-[35px] grid grid-cols-1 gap-5 gap-y-[30px]
        xs:grid-cols-2 xs:py-[30px] xs:px-[50px]
        lg:gap-y-5 lg:grid-cols-4
      `}>
        <div className='flex flex-col'>
          <A
            utilClasses='font-decorative text-2xl'
            href='/'
            text='HT'
          />
          <div className='pb-2 text-sm text-neutral-400'>
            info@holdem-trainer.com
          </div>
          <div className='mt-auto flex gap-[15px]'>
            <A utilClasses='text-xl' icon='youtube' href='/' />
            <A utilClasses='text-xl' icon='twitter-x' href='/' />
            <A utilClasses='text-xl' icon='discord' href='/' />
          </div>
        </div>
        <div>
          <h1 className='mb-3 text-xl md:text-[22px] font-medium text-neutral-600'>
            App
          </h1>
          <div className='flex flex-col items-start gap-2 text-[15px] md:text-base'>
            <A text='Manager' href='/app/manager' />
            <A text='Editor' href='/app/editor/dummyId' />
            <A text='Trainer' href='/app/trainer' />
          </div>
        </div>
        <div>
          <h1 className='mb-3 text-xl md:text-[22px] font-medium text-neutral-600'>
            Academy
          </h1>
          <div className='flex flex-col items-start gap-2 text-[15px] md:text-base'>
            <A text='General' href='/academy' />
            <A text='Preflop' href='/academy' />
            <A text='Postflop' href='/academy' />
          </div>
        </div>
        <div>
          <h1 className='mb-3 text-xl md:text-[22px] font-medium text-neutral-600'>
            Info
          </h1>
          <div className='flex flex-col items-start gap-2 text-[15px] md:text-base'>
            <A text='HT-pro' href='/pricing' />
            <A text='Support' href='/support' />
          </div>
        </div>
      </div>
      <div className={`
        py-[20px] px-[35px] flex flex-col self-start text-[11px] gap-[15px]
        xs:self-center xs:flex-row xs:py-[15px] xs:px-[50px]
      `}>
        <div className='text-neutral-400'>
          © 2024 - A. Landmann
        </div>
        <div className='flex gap-3 flex-col xs:flex-row'>
          <A text='FAQ' href='/support' />
          <A text='Privacy Policy' href='/support' />
          <A text='Terms & Conditions' href='/support' />
        </div>
      </div>
    </div>
  )
}