import InfoLayout from '@/components/_layout/InfoLayout'
import OfferCard from './OfferCard'
import PricingFaqItem from './PricingFaqItem'
import A from '../_ui/A'
import { useUser } from '@/hooks/useUser'

export default function PricingRoot() {
  const [user, setUser, isLoading] = useUser()

  return (
    <InfoLayout>
      {!isLoading &&
        <>
          <div className='px-5 flex flex-col gap-3 items-center py-14'>
            <h1 className='text-5xl'>
              <span className='font-decorative'>HT</span> - Pro
            </h1>
            <h3 className='text-lg text-neutral-500'>
              Unlock the full potential of Hold'em Trainer
            </h3>
          </div>
          <div className='px-5 flex justify-center gap-6 mb-8'>
            <OfferCard
              user={user}
              title='HT-Basic'
              price={0}
              btnTheme='nice'
              btnText={
                !user
                  ? 'Create free account'
                  : (user.membership === 'basic'
                    ? 'active'
                    : 'downgrade')
              }
              btnDisabled={user && user.membership === 'basic'}
            >
              <div>Manage up to 20 custom ranges</div>
              <div>Train up to 4  ranges at once</div>
              <div>Duplicate ranges directly from introductory articles</div>
            </OfferCard>
            <OfferCard
              user={user}
              title='HT-Pro'
              price={7.99}
              popular
              btnTheme='nice'
              btnText={(!user || user.membership === 'basic')
                ? 'upgrade now'
                : user.membership == 'pro'
                  ? 'active'
                  : 'change plan'
              }
              btnDisabled={user && user.membership === 'pro'}
            >
              <div>Manage up to 100 custom ranges</div>
              <div>Unlimited parallel training</div>
              <div>Full access to all articles in the HT-Academy</div>
              <div>Cancel at any time</div>
            </OfferCard>
            <OfferCard
              user={user}
              title='HT-Elite'
              price={9.99}
              btnTheme='nice'
              btnText={(!user || user.membership !== 'elite')
                ? 'upgrade now'
                : 'active'
              }
              btnDisabled={user && user.membership === 'elite'}
            >
              <div>Unlimited range management</div>
              <div>Unlimited parallel training</div>
              <div>Full access to all articles in the HT-Academy</div>
              <div>Early access to new features</div>
              <div>Cancel at any time</div>
            </OfferCard>
          </div>
          <div className='px-5 mb-28 flex justify-center text-xs text-neutral-500'>
            Please read our <A href='/support/terms-and-conditions' text='Terms & Conditions' utilClasses='mx-1' /> before upgrading to HT-Pro or HT-Elite.
          </div>
          <div className='flex flex-col items-center mb-20'>
            <h1 className='text-3xl tracking-wide mb-10'>
              FAQ
            </h1>
            <div className='flex flex-col gap-10'>
              <PricingFaqItem
                question='How do HT-Pro and HT-Elite allow me to manage more ranges?'
                answer={`
                  With the free HT-Basic tier you can manage up to 20 ranges in your repertoire.
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
              <PricingFaqItem
                question='What is meant by parallel training?'
                answer={`
                  Hold'em Trainer allows you train multiple ranges in a single session
                  randomly selecting different ones for each exercise. By default this functionality
                  is limited to selecting up to 4 ranges to train together. By upgrading to at least HT-Pro,
                  any amount of ranges can be trained together in a single session, allowing you to challenge yourself
                  accross your entire repertoire.
                `}
              />
              <PricingFaqItem
                question='What kind of access do I gain in the HT-Academy by upgrading?'
                answer={`
                  The HT-Academy features many articles of different levels: Beginner, Intermediate, Advanced, and Expert.
                  These articles also include featured ranges that are explained, and which the reader may duplicate to
                  his own repertoire to train or to modify further. With the free HT-Basic tier users are able to
                  duplicate ranges only from beginner - level articles. By upgrading the ranges in every other level can
                  be duplicated as well.
                `}
              />
              <PricingFaqItem
                question='How can I cancel my subscription?'
                answer={`
                  You can cancel your subscription at any time by navigating back to this page and changing your plan
                  to the HT-Basic tier. Your HT-Pro or HT-Elite features will remain active for one month after the last payment.
                `}
              />
            </div>
          </div>
        </>
      }
    </InfoLayout>
  )
}