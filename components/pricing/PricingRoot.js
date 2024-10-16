import InfoLayout from '@/components/_layout/InfoLayout'
import Button from '../_ui/Button'
import OfferCard from './OfferCard'

export default function PricingRoot() {
  return (
    <InfoLayout>
      <div className='flex justify-center gap-6 mt-20'>
        <OfferCard
          title='HT-Basic'
          price={0}
          btnTheme='secondary'
          btnText='currently active'
          btnDisabled={true}
        >
          <div>Manage up to <span>20</span> custom ranges</div>
          <div>Train up to <span>4 </span> ranges at once</div>
          <div>Duplicate ranges directly from <span>introductory</span> articles</div>
        </OfferCard>
        <OfferCard
          title='HT-Pro'
          price={7.99}
          btnTheme='nice'
          btnText='upgrade now'
          btnDisabled={false}
        >
          <div>Manage up to <span>100</span> custom ranges</div>
          <div><span>Unlimited</span> parallel training</div>
          <div><span>Full</span> access to all articles in the HT-Academy</div>
          <div>Access to priority-feedback discord-channel</div>
          <div>Cancel at any time</div>
        </OfferCard>
        <OfferCard
          title='HT-Elite'
          price={9.99}
          btnTheme='nice'
          btnText='upgrade now'
          btnDisabled={false}
        >
          <div>Manage up to <span>20</span> custom ranges</div>
          <div><span>Unlimited</span> parallel training</div>
          <div><span>Full</span> access to all articles in the HT-Academy</div>
          <div>Access to priority-feedback discord-channel</div>
          <div>Early access to new features</div>
          <div>Cancel at any time</div>
        </OfferCard>
      </div>
    </InfoLayout>
  )
}