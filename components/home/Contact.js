import A from '../_ui/A'

export default function Contact() {
  return (
    <section className='flex flex-col items-center py-32 px-20 border-t bg-neutral-800 bg-opacity-10'>
      <h1 className='text-4xl text-neutral-400 mb-16'>
        Reach out
      </h1>
      <div className='flex gap-16 text-6xl mb-16'>
        <A href='/' icon='youtube' />
        <A href='/' icon='twitter-x' />
        <A href='/' icon='discord' />
      </div>
      <A
        href='mailto:info@holdem-trainer.com'
        text='info@holdem-trainer.com'
        utilClasses='text-xl'
      />
    </section>
  )
}