import InfoLayout from '@/components/_layout/InfoLayout'
import OfferCard from './OfferCard'
import PricingFaqItem from './PricingFaqItem'

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
      <div className='flex justify-center gap-6 mb-28'>
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
      <div className='flex flex-col items-center mb-20'>
        <h1 className='text-5xl tracking-wide mb-10'>
          FAQ
        </h1>
        <div className='flex flex-col gap-10'>
          <PricingFaqItem
            question='How do HT-Pro and HT-Elite allow me to manage more ranges?'
            answer={`
            With the free HT-Basic tier, you can manage up to 20 ranges in your repertoire.
            To add further ranges you will have to delete old ones first.
            With HT-Pro, this limit is increased to 100 ranges in your repertoire, and with
            HT-Elite, you can add and manage as many ranges as you like.
          `}
          />
          <PricingFaqItem
            question='What if I cancel or downgrade, will my ranges get lost?'
            answer={`
            No. If you are managing more than 20 and your subscription expires,
            your ranges will be locked for use, and you will be able to unlock 20 ranges
            (or 100 ranges respectively) upon your next login. The remaining locked ranges will remain
            on your account until you delete them, or until you decide to upgrade again.
          `}
          />
        </div>
      </div>
    </InfoLayout>
  )
}