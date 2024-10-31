import Button from '../_ui/Button'

export default function FinalCta() {
  return (
    <section className='flex flex-col items-center py-20 xl:py-32 px-12 xl:px-20 bg-neutral-800 bg-opacity-10 border-t border-b'>
      <div className='font-decorative text-[100px] text-neutral-700'>
        HT
      </div>
      <h1 className='text-4xl mb-12 text-center'>
        Sign up for free!
      </h1>
      <Button
        theme='nice'
        utilClasses='py-3 px-4'
        text="Create free account"
        onClick={() => { window.open('/academy', '_blank') }}
      />
    </section>
  )
}