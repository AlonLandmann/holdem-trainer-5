import Image from 'next/image'
import Button from '../_ui/Button'

export default function Hero2() {
  return (
    <div
      className='relative flex justify-center items-center'
      style={{ minHeight: 'calc(100vh - 56px)' }}
    >
      <div className='absolute top-0 left-0 z-10 h-full w-full bg-neutral-900 opacity-15'>
        <Image
          src='/hero.jpg'
          alt='poker-image'
          priority
          fill
          objectFit='cover'
        />
      </div>
      <div className='max-w-[80%] flex flex-col items-center text-start z-20'>
        <h1 className='mb-5 m-w-[500px] text-3xl font-medium text-neutral-50 md:text-4xl'>
          Refine your game
        </h1>
        <h3 className='mb-7 max-w-[500px] text-neutral-300 text-sm md:text-base'>
          Create your own custom poker ranges and train them on Hold'em Trainer for free.
        </h3>
        <div className='flex gap-3'>
          <Button
            theme='nice'
            utilClasses='rounded-sm py-3 px-4 bg-opacity-80'
            text='Create an account'
            onClick={() => { window.location = '/auth/signup' }}
          />
          <Button
            theme='secondary'
            utilClasses='rounded-sm py-3 px-4 bg-opacity-80 bg-neutral-900'
            text='Watch user guide'
            onClick={() => { window.open('https://www.youtube.com/watch?v=z6PkfQihrUc', '_blank') }}
          />
        </div>
      </div>
    </div>
  )
}