import Button from '../_ui/Button'

export default function OfferCard({
  title,
  price,
  children,
  btnTheme,
  btnText,
  btnDisabled,
}) {
  return (
    <div className='py-5 px-8 w-[320px] border rounded flex flex-col'>
      <div>
        {title}
      </div>
      <div>
        {price > 0 ? price : 'Free'}
      </div>
      <div className='mb-28'>
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