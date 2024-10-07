import Button from '@/components/_ui/Button'
import { random } from 'lodash'
import { useRouter } from 'next/router'
import { useState } from 'react'

const QUOTES = [
  { author: 'Pablo Picasso', quote: 'I am always doing that which I cannot do, in order that I may learn how to do it.' },
  { author: 'Aristotle', quote: 'For the things we have to learn before we can do them, we learn by doing them.' },
  { author: 'Luke Campbell', quote: 'Talent is nothing without dedication and discipline, and dedication and discipline is a talent in itself.' }
]

export default function QuoteCta() {
  const router = useRouter()
  const [quoteState, setQuoteState] = useState(QUOTES[random(QUOTES.length - 1)]) 

  return (
    <div className='grow flex flex-col justify-center items-center'>
      <div>
        <div className='font-decorative text-[140px] -mb-28 text-neutral-700'>
          “
        </div>
        <p className='max-w-[40ch] text-xl pl-10 mb-3 text-neutral-400'>
          {quoteState.quote}
        </p>
        <div className='flex gap-2 pl-6 mb-8 text-lg'>
          <i className='bi bi-dash text-neutral-500'></i>
          <div className='text-neutral-500'>
            {quoteState.author}
          </div>
        </div>
      </div>
      <div className='flex gap-2'>
        <Button
          theme='secondary'
          utilClasses='py-3 px-4'
          icon='ui-checks'
          text='Manage Ranges'
          onClick={() => { router.push('/app/manager') }}
        />
        <Button
          theme='primary'
          utilClasses='py-3 px-4'
          icon='crosshair'
          text='Keep Training'
          onClick={() => { router.push('/app/trainer') }}
        />
      </div>
    </div>
  )
}