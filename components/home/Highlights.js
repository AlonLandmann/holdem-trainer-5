import Image from 'next/image'
import Button from '../_ui/Button'

export default function Highlights() {
  return (
    <section className='border-b py-32 px-20 flex flex-col items-center'>
      <h1>

      </h1>
      <div className='grid grid-cols-2 gap-x-36 gap-y-28'>
        <div className='py-16 max-w-[500px]'>
          <h2 className='text-2xl text-neutral-500 mb-6'>
            Preflop & Postflop
          </h2>
          <p className='leading-8 text-lg text-neutral-300 mb-8'>
            Hold'em Trainer allows you to build ranges for any spot that can occur
            in a 6-max game. This includes postflop scenarios.
            Shown is a C-betting range for UTG vs BB play after the BB has checked
            the Ks Js 9h flop.
          </p>
          <Button
            theme='secondary'
            utilClasses='py-3 px-4'
            text='Sign up to build your own'
          />
        </div>
        <div>
          <Image
            src='/postflop.png'
            width={500}
            height={500}
          />
        </div>
        <div>

        </div>
        <div className='py-16 max-w-[500px]'>
          <h2 className='text-2xl text-neutral-500 mb-6'>
            All Combos in one View
          </h2>
          <p>

          </p>
        </div>
        <div className='py-16 max-w-[500px]'>
          <h2 className='text-2xl text-neutral-500 mb-6'>
            Detailed Categories
          </h2>
          <p>

          </p>
        </div>
        <div>

        </div>
        <div>

        </div>
        <div className='py-16 max-w-[500px]'>
          <h2 className='text-2xl text-neutral-500 mb-6'>
            Linked Ranges
          </h2>
          <p>

          </p>
        </div>
      </div>
    </section>
  )
}