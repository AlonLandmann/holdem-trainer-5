import A from '../_ui/A'

export default function Contact() {
  return (
    <section className='flex flex-col items-center py-20 xl:py-32 px-12 xl:px-20 bg-neutral-800 bg-opacity-10 border-t border-b'>
      <h1 className='text-2xl xs:text-3xl sm:text-4xl mb-2'>
        Reach out
      </h1>
      <h2 className='text-lg text-neutral-500 mb-8 text-center'>
        We are always pleased to here from you.
      </h2>
      <A
        href='mailto:info@holdem-trainer.com'
        text='info@holdem-trainer.com'
        utilClasses='text-xl mb-16'
      />
      <div className='flex flex-col xs:flex-row gap-16 text-6xl'>
        <A href='/' icon='youtube' />
        <A href='/' icon='twitter-x' />
        <A href='/' icon='discord' />
      </div>
    </section>
  )
}