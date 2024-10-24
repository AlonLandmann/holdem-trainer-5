import Image from 'next/image'
import Button from '../_ui/Button'

export default function Highlights() {
  return (
    <section className='border-b py-32 px-20 flex flex-col items-center'>
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
            text='Build your own ranges'
            onClick={() => { window.open('/auth/signup', '_blank') }}
          />
        </div>
        <div className='justify-self-center'>
          <Image
            src='/postflop.png'
            width={500}
            height={500}
            alt='postflop range'
          />
        </div>
        <div className='justify-self-center'>
          <Image
            src='/all-at-once-full.png'
            width={500}
            height={500}
            alt='detailed combos'
          />
        </div>
        <div className='py-16 max-w-[500px]'>
          <h2 className='text-2xl text-neutral-500 mb-6'>
            All Combos in one View
          </h2>
          <p className='leading-8 text-lg text-neutral-300 mb-5'>
            The suits of your hole cards play an important role in post-flop play.
            Flushes, flush draws, and back-door flush draws are frequent, and important blockers such as the Ace of a particular suit
            can give valuable information as to whether an opponent is more or less likely to bluff in a given spot.
          </p>
          <p className='leading-8 text-lg text-neutral-300 mb-8'>
            Traditional ranges only show information on whether the holecards are suited or not.
            With our range viewer it is possible to view all of the information at once.
          </p>
          <Button
            theme='secondary'
            utilClasses='py-3 px-4'
            text='Try it now'
            onClick={() => { window.open('/auth/signup', '_blank') }}
          />
        </div>
        <div className='py-16 max-w-[500px]'>
          <h2 className='text-2xl text-neutral-500 mb-6'>
            Detailed Categories
          </h2>
          <p className='leading-8 text-lg text-neutral-300 mb-8'>
            The Hold'em Trainer Editor is complete with a suit of hand categories that
            allow you to easily select the combos you want to edit. The categories
            also provide valuable insights as to how the ranges corresponding to the different actions are made up.
          </p>
          <Button
            theme='secondary'
            utilClasses='py-3 px-4'
            text='Try the editor'
            onClick={() => { window.open('/auth/signup', '_blank') }}
          />
        </div>
        <div className='justify-self-center'>
          <Image
            src='/categories.png'
            width={350}
            height={500}
            alt='categories'
          />
        </div>
        <div className='justify-self-center'>
          <Image
            src='/slider.png'
            width={450}
            height={500}
            alt='brush'
          />
        </div>
        <div className='py-16 max-w-[500px]'>
          <h2 className='text-2xl text-neutral-500 mb-6'>
            Full control for every level
          </h2>
          <p className='leading-8 text-lg text-neutral-300 mb-8'>
            The Hold'em Trainer Editor allows for fine grain control of the desired strategy.
            But this also means that newer players are able to create very simple ranges to start with,
            and build their game at a steady pace. More detail can always be introduced later on.
          </p>
          <Button
            theme='secondary'
            utilClasses='py-3 px-4'
            text='Get started'
            onClick={() => { window.open('/auth/signup', '_blank') }}
          />
        </div>
        {/* <div>
          <Image
            src='/together.png'
            width={450}
            height={500}
          />
        </div>
        <div className='py-16 max-w-[500px]'>
          <h2 className='text-2xl text-neutral-500 mb-6'>
            Linked Ranges
          </h2>
          <p className='leading-8 text-lg text-neutral-300 mb-8'>
            Hold'em Trainer has built in functionality to connect ranges that follow each other.
            The example shows how a C-betting range postflop can be linked to the raise that had to be made preflop to get to that spot.
            In training, only the hands that are relevant for the C-betting range will appear.
          </p>
          <Button
            theme='secondary'
            utilClasses='py-3 px-4'
            text='Build your game now'
            onClick={() => { window.open('/auth/signup', '_blank') }}
          />
        </div> */}
      </div>
    </section>
  )
}