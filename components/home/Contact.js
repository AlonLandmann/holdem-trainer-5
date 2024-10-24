import A from '../_ui/A'

export default function Contact() {
  return (
    <section className='flex flex-col items-center py-32 px-20'>
      <h1 className='text-4xl mb-2'>
        Reach out
      </h1>
      <h2 className='text-lg text-neutral-500 mb-8'>
        We are always pleased to here from you.
      </h2>
      <A
        href='mailto:info@holdem-trainer.com'
        text='info@holdem-trainer.com'
        utilClasses='text-xl mb-16'
      />
      <div className='flex gap-16 text-6xl'>
        <A href='/' icon='youtube' />
        <A href='/' icon='twitter-x' />
        <A href='/' icon='discord' />
      </div>
    </section>
  )
}