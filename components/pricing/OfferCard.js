import Button from '../_ui/Button'

export default function OfferCard({
  title,
  price,
  children,
  btnTheme,
  btnText,
  btnDisabled,
}) {
  const fullNr = Math.floor(price).toFixed(0)
  const cents = Math.floor(100 * (price - Math.floor(price)))

  return (
    <div className='py-5 px-10 w-[320px] border rounded flex flex-col'>
      <div className='py-8 flex justify-center items-center text-neutral-400 text-lg'>
        {title}
      </div>
      <div className='flex justify-center items-center h-16'>
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
          </div>
        }
        {price === 0 &&
          <div className='text-xl uppercase tracking-wide'>
            free
          </div>
        }
      </div>
      <div className='py-8 mb-10 flex flex-col gap-4 text-sm'>
        {children}
      </div>
      <Button
        theme={btnTheme}
        utilClasses='mt-auto py-3 px-4'
        text={btnText}
        disabled={btnDisabled}
      />
    </div>
  )
}