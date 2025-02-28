import Image from 'next/image'
import Button from '../_ui/Button'
import { useRouter } from 'next/router'

export default function Hero() {
  const router = useRouter()

  return (
    <div
      className='relative p-7 flex justify-center items-center border-b'
      style={{ minHeight: 'calc(100vh - 56px)' }}
    >
      <div className='absolute top-0 left-0 z-10 h-full w-full bg-neutral-900 opacity-15'>
        <Image
          className='object-cover'
          src='/hero.jpg'
          alt='poker-image'
          priority
          fill
        />
      </div>
      <div className='flex flex-col items-start xs:items-center xs:text-center z-20'>
        <h1 className='mb-5 max-w-[480px] text-3xl font-medium text-neutral-50 md:text-4xl'>
          Refine your game
        </h1>
        <h3 className='mb-7 max-w-[480px] text-neutral-300 md:text-lg'>
          Create your own custom poker ranges and train them on Hold'em Trainer.
        </h3>
        <div className='flex flex-col xs:flex-row gap-2'>
          <Button
            theme='nice'
            utilClasses='rounded-sm py-3 px-4 bg-opacity-80'
            text='Create free account'
            onClick={() => { router.push('/auth/signup') }}
          />
          <Button
            theme='secondary'
            utilClasses='rounded-sm py-3 px-4 bg-opacity-80 bg-neutral-900'
            text='Watch our guide'
            onClick={() => { window.open('https://www.youtube.com/watch?v=idgX7AKXh8c', '_blank') }}
          />
        </div>
      </div>
    </div>
  )
}