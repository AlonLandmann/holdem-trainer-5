import Link from 'next/link'

export default function Footer() {
  return (
    <div className='bg-[#171717] border-t flex flex-col'>
      <div
        className={`
          py-[20px] px-[35px] grid grid-cols-1 gap-5 gap-y-[30px]
          xs:grid-cols-2 xs:py-[30px] xs:px-[50px]
          lg:gap-y-5 lg:grid-cols-4
        `}
      >
        <div className='flex flex-col'>
          <div className='self-start font-decorative text-[25px]'>
            <Link href='/'>HT</Link>
          </div>
          <div className='pb-2 text-sm text-neutral-400'>
            info@holdem-trainer.com
          </div>
          <div className='mt-auto flex gap-[15px]'>
            <div className='text-xl text-neutral-300 cursor-pointer hover:text-neutral-400'>
              <i className='bi bi-youtube'></i>
            </div>
            <div className='text-xl text-neutral-300 cursor-pointer hover:text-neutral-400'>
              <i className='bi bi-twitter-x'></i>
            </div>
            <div className='text-xl text-neutral-300 cursor-pointer hover:text-neutral-400'>
              <i className='bi bi-discord'></i>
            </div>
          </div>
        </div>
        <div>
          <h1 className='mb-3 text-xl md:text-[22px] font-medium text-neutral-600'>
            App
          </h1>
          <div className='flex flex-col items-start gap-2 text-[15px] md:text-base'>
            <Link href='/app/manager' className='hover:text-neutral-400'>Manager</Link>
            <Link href='/app/editor/dummyId' className='hover:text-neutral-400'>Editor</Link>
            <Link href='/app/trainer' className='hover:text-neutral-400'>Trainer</Link>
          </div>
        </div>
        <div>
          <h1 className='mb-3 text-xl md:text-[22px] font-medium text-neutral-600'>
            Academy
          </h1>
          <div className='flex flex-col items-start gap-2 text-[15px] md:text-base'>
            <Link href='/academy' className='hover:text-neutral-400'>General</Link>
            <Link href='/academy' className='hover:text-neutral-400'>Preflop</Link>
            <Link href='/academy' className='hover:text-neutral-400'>Postflop</Link>
          </div>
        </div>
        <div>
          <h1 className='mb-3 text-xl md:text-[22px] font-medium text-neutral-600'>
            Info
          </h1>
          <div className='flex flex-col items-start gap-2 text-[15px] md:text-base'>
            <Link href='/pricing' className='hover:text-neutral-400'>HT-pro</Link>
            <Link href='/support' className='hover:text-neutral-400'>Support</Link>
          </div>
        </div>
      </div>
      <div
        className={`
          py-[20px] px-[35px] flex flex-col self-start text-[11px] gap-[15px]
          xs:self-center xs:flex-row xs:py-[15px] xs:px-[50px]
        `}
      >
        <div className='text-neutral-400'>
          © 2024 - A. Landmann
        </div>
        <div className='flex gap-3 flex-col xs:flex-row'>
          <Link href='/support' className='hover:text-neutral-400'>FAQ</Link>
          <Link href='/support' className='hover:text-neutral-400'>Privacy Policy</Link>
          <Link href='/support' className='hover:text-neutral-400'>Terms & Conditions</Link>
        </div>
      </div>
    </div>
  )
}