import Button from '../_ui/Button'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function OfferCard({
  user,
  title,
  price,
  children,
  btnTheme,
  btnText,
  btnDisabled,
  popular = false,
}) {
  const fullNr = Math.floor(price).toFixed(0)
  const cents = Math.floor(100 * (price - Math.floor(price)))

  return (
    <div className='relative py-5 px-10 max-w-[320px] border rounded flex flex-col overflow-hidden'>
      {popular &&
        <div className='absolute top-4 -left-9 pb-[2px] -rotate-45 px-10 rounded-sm bg-[#914343] text-[#deb1b1]'>
          popular
        </div>
      }
      <div className='py-4 pb-8 flex justify-center items-center text-neutral-400 text-lg'>
        {title}
      </div>
      <div className='flex justify-center items-center h-16 mb-4'>
        {price > 0 &&
          <div className='flex items-center'>
            <div className='text-2xl mr-3 mt-1'>
              $
            </div>
            <div className='text-4xl mr-1'>
              {fullNr}
            </div>
            <div className='text-sm self-start'>
              {cents}
            </div>
            <div className='text-neutral-500 mr-1 text-lg mt-2'>
              /
            </div>
            <div className='mt-3'>
              mo
            </div>
          </div>
        }
        {price === 0 &&
          <div className='text-xl'>
            Free
          </div>
        }
      </div>
      <div className='py-8 mb-10 flex flex-col gap-6 text-neutral-500'>
        {children}
      </div>
      <Button
        theme={btnTheme}
        utilClasses='py-3 px-4 mt-auto'
        text={btnText}
        disabled={btnDisabled}
      />
    </div>
  )
}

{/* <form className='mt-auto' action={`/api/stripe/checkout?productName=${title}`} method='POST'>
        <Button
          theme={btnTheme}
          utilClasses='py-3 px-4 w-full'
          text={btnText}
          disabled={btnDisabled}
          type='submit'
        />
      </form> */}