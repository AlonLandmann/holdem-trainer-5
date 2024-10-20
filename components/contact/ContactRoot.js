import InfoLayout from '@/components/_layout/InfoLayout'
import A from '../_ui/A'
import SupportNavbar from '../_layout/SupportNavbar'

export default function ContactRoot() {
  return (
    <InfoLayout>
      <div className='py-5 px-10'>
        <SupportNavbar page='contact' />
        <div className='max-w-[800px] mx-auto'>
          <h1 className='text-2xl text-neutral-500 mb-5'>
            Contact
          </h1>
          <div className='mb-3'>
            We are an early stage company, and as such we value your feedback very highly. Feel free to get in touch with
            any questions, feedback, and comments you might have. You can email us directly at the given email address, or
            you may also join our communities on YouTube, X, and Discord.
          </div>
          <div className='flex gap-1 mb-4'>
            <A
              href='mailto:info@holdem-trainer.com'
              text='info@holdem-trainer.com'
              utilClasses='text-neutral-400 hover:text-neutral-500'
            />
          </div>
          <div className='flex gap-3'>
            <A
              href='/'
              icon='youtube'
              utilClasses='text-lg text-neutral-400 hover:text-neutral-500'
            />
            <A
              href='/'
              icon='twitter-x'
              utilClasses='text-lg text-neutral-400 hover:text-neutral-500'
            />
            <A
              href='/'
              icon='discord'
              utilClasses='text-lg text-neutral-400 hover:text-neutral-500'
            />
          </div>
        </div>
      </div>
    </InfoLayout>
  )
}