import InfoLayout from '@/components/_layout/InfoLayout'
import Button from '../_ui/Button'
import OfferCard from './OfferCard'

export default function PricingRoot() {
  return (
    <InfoLayout>
      <div className='flex flex-col gap-3 items-center py-14'>
        <h1 className='text-5xl'>
          <span className='font-decorative'>HT</span> - Pro
        </h1>
        <h3 className='text-lg text-neutral-500'>
          Unlock the full potential of Hold'em Trainer
        </h3>
      </div>
      <div className='flex justify-center gap-6 mb-20'>
        <OfferCard
          title='HT-Basic'
          price={0}
          btnTheme='nice'
          btnText='currently active'
          btnDisabled={true}
        >
          <div>Manage <span className='text-neutral-200'>up to 20</span> custom ranges</div>
          <div>Train <span className='text-neutral-200'>up to 4 </span> ranges at once</div>
          <div>Duplicate ranges directly from <span className='text-neutral-200'>introductory</span> articles</div>
        </OfferCard>
        <OfferCard
          title='HT-Pro'
          price={7.99}
          btnTheme='nice'
          btnText='upgrade now'
          btnDisabled={false}
        >
          <div>Manage <span className='text-neutral-200'>up to 100</span> custom ranges</div>
          <div><span className='text-neutral-200'>Unlimited</span> parallel training</div>
          <div><span className='text-neutral-200'>Full</span> access to all articles in the HT-Academy</div>
          <div>Cancel at any time</div>
        </OfferCard>
        <OfferCard
          title='HT-Elite'
          price={9.99}
          btnTheme='nice'
          btnText='upgrade now'
          btnDisabled={false}
        >
          <div><span className='text-neutral-200'>Unlimited</span> range management</div>
          <div><span className='text-neutral-200'>Unlimited</span> parallel training</div>
          <div><span className='text-neutral-200'>Full</span> access to all articles in the HT-Academy</div>
          <div>Early access to new features</div>
          <div>Cancel at any time</div>
        </OfferCard>
      </div>
    </InfoLayout>
  )
}