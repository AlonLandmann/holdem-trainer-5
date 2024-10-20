import InfoLayout from '@/components/_layout/InfoLayout'
import SupportFaqItem from './SupportFaqItem'
import Link from 'next/link'
import EditorHotkeys from '../editor/EditorHotkeys'
import { useState } from 'react'
import Button from '../_ui/Button'
import { getMilitaryRank, rankScoresSorted } from '@/lib/stats'
import RankBanner from '../overview/RankBanner'
import { withSeparators } from '@/lib/display'
import A from '../_ui/A'

export default function SupportRoot() {
  const [page, setPage] = useState('contact') // contact, faq, termsAndConditions, privacyPolicy
  const [viewHotkeyInfo, setViewHotkeyInfo] = useState(false)

  return (
    <InfoLayout>
      {viewHotkeyInfo &&
        <EditorHotkeys
          user={{ settings: { hotkeyInfoDismissed: true } }}
          setUser={null}
          setViewHotkeyInfo={setViewHotkeyInfo}
        />
      }
      <div className='py-5 px-10'>
        <div className='flex flex-col gap-3 items-center py-14'>
          <h1 className='text-5xl'>
            <span className='font-decorative'>HT</span> - Support
          </h1>
          <div className='flex gap-8'>
            <Button
              theme='link'
              utilClasses=''
              text='Contact'
              onClick={() => { setPage('contact') }}
            />
            <Button
              theme='link'
              utilClasses=''
              text='FAQ'
              onClick={() => { setPage('faq') }}
            />
            <Button
              theme='link'
              utilClasses=''
              text='Terms & Conditions'
              onClick={() => { setPage('termsAndConditions') }}
            />
            <Button
              theme='link'
              utilClasses=''
              text='Privacy Policy'
              onClick={() => { setPage('privacyPolicy') }}
            />
          </div>
        </div>
        {page === 'contact' &&
          <div className='max-w-[800px] mx-auto mb-32'>
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
        }
        {page === 'faq' &&
          <div className='max-w-[800px] mx-auto mb-32'>
            <h1 className='text-2xl text-neutral-500 mb-5'>
              FAQ
            </h1>

            <div className='flex flex-col gap-10'>
              <SupportFaqItem question="Why should I use Hold'em Trainer?">
                Hold'em Trainer allows you to build your basic poker game step by step.
                The manager let's you gain an overview over your strategies pre- and post-flop,
                and the trainer allows you to drill as many hands as you want in any given spot.
                This is a much more efficient way to let the correct decisions become second nature,
                especially for the more uncommon scenarios. Playing live gets you 30 hands per hour at best,
                and while playing online let's you see more hands, it doesn't let you choose
                the area of the game you'd like to work on, and it also doesn't provide immediate feedback.
                With Hold'em Trainer you can train whatever you like, however often you like.
              </SupportFaqItem>

              <SupportFaqItem question="How do I use Hold'em Trainer effectively?">
                One effective way to use Hold'em Trainer is the following.
                First choose an area of the game you'd like to focus on, preferably a scenario that is either a first decision
                in a hand, or one that builds on another decision, which you are already comfortable with.
                Once chosen, build a few ranges of how you would like to play in those scenarios, or have a look at the Hold'em Academy
                to check whether we have already built some sample ranges for the scenarios in question.
                Study and tweak the ranges to your liking, you can also use solvers to optimize them in this step.
                Finally, spend a few days to drill these spots until they become more or less second nature to you.
                Afterwords, you can move on to conquer new areas of the game, but it might be useful to come back to the older ranges
                once in a while to keep them fresh.
              </SupportFaqItem>

              <SupportFaqItem question='When might it be useful to upgrade to a paid subscription?'>
                Hold'em Trainer is free for anyone to use and try out. Our HT-Basic tier let's you manage up to 20 ranges freely.
                However, if you are enjoying the process and would like to train more areas of your game, you can consider upgrading
                to the HT-Pro tier, which gives you the freedom to manage up to 100 ranges. If you desire still more, the HT-Elite
                tier offers unlimited access. Both the Pro and Elite tiers also allow you train more than four ranges at once in a single
                training session, and they give you full access to duplicate curated ranges from all Hold'em Academy articles.
                You can learn more about the HT-Pro and HT-Elite tiers <Link href='/pricing' className='text-neutral-400 hover:text-neutral-500'>here</Link>.
              </SupportFaqItem>

              <SupportFaqItem question="I am new to poker, is Hold'em Trainer for me?">
                Certainly. Hold'em Trainer is for anyone who aspires to learn more and become better at this great game.
                If you are new to the game it might benefit you to read some of the beginner articles at the Hold'em Academy.
                Some of these articles contain curated ranges that you may duplicate to start training the most common situations that
                arise in poker. You can also check out our YouTube channel, as well as our X and Discord communities for additional
                resources and support. Of course, there is also plenty of other content out there from other creators.
                You can use Hold'em Trainer to try and internalize and solidify the things you learn. The great thing is that it gives
                you full flexibility of designing your ranges. This means you can build simple ranges to start with, whereas some other
                services will try to get you to play perfectly from the start, which can often be overwhelming. With Hold'em Trainer,
                you can approach your understanding the game methodically, and at your own pace.
              </SupportFaqItem>

              <SupportFaqItem question='Setting up ranges seems difficult and time consuming, is there a faster way?'>
                First, make sure you are using the
                <Button
                  theme='link'
                  utilClasses='text-neutral-400 hover:text-neutral-500 mx-1'
                  icon='alt'
                  text='essential hotkeys'
                  onClick={() => { setViewHotkeyInfo(true) }}
                />
                that are available for building ranges quickly.
                Second, make sure you utilize the + and - buttons available in the hand categories panel of the editor to quickly select and filter out related combos.
                Finally, there are many curated ranges available in Hold'em Academy articles that you can duplicate and adjust as you desire.
              </SupportFaqItem>

              <SupportFaqItem question='What is the purpose of linking ranges via the predecessor relation?'>
                The main purpose of linking ranges is to make sure that you only train the hole cards that you will actually hold in any given scenario.
                For example, if you never decide to open raise A6 from under the gun, then A6 should not appear in the range where you are defending
                your opening raise against a 3-bet. To this end, you can link your vs-3-bet range to your UTG open range, and Hold'em Trainer
                will automatically adjust the frequencies of each hole card to match the frequency with which the relevant action was chosen.
                You will also be notified when making changes to ranges that other ranges depend on, so that you can keep your ranges in sync with each other.
              </SupportFaqItem>

              <SupportFaqItem question='How am I supposed to train with the random number generator?'>
                Hold'em Trainer is meant to help you to get to the highest level of playing poker. And mixed strategies (taking action A some of the time and action B some of the time)
                are an essential part to maintaining balanced ranges that cannot be exploited. The random number generator (RNG) in the training screen will
                give you a number between 0.1 and 100.0. In your range, if you have selected three options, (let's say fold, call, and raising to 2.5 bb),
                and you have assigned each action the following frequences: 40 % fold, 30 % call, 30 % raise, then the RNG works as follows.
                When it shows a number between 0.1 and 40.0 you are supposed to fold, when it shows a number from 40.1 to 70.0 you are supposed to call,
                and when it shows a number between 70.1 and 100.0 you are supposed to raise.
              </SupportFaqItem>

              <SupportFaqItem question='If we cannot play with a random number generator in live games, why train with one?'>
                In Game Theory Optimal play, mixing your strategies with certain hands is unavoidable and often essential.
                It is true that playing live, it is not easy to simulate completely random play. However, it is still better to know
                what your expected actions should be in a given scenario. You can then apply the reads you have on other players,
                factor in your own table image, or find some other process to help you decide on the particular action you want to take.
                Once you know the expected way to mix up your play, you can exploit more easily and with intent, all while maintaining balanced ranges.
              </SupportFaqItem>

              <SupportFaqItem question='How are the points earned after a training session calculated?'>
                Hold'em Trainer assigns each of your ranges a complexity score between zero and one.
                For instance, a completely blank range where every hand chooses the same action 100% of the time
                will get a complexity score of zero, and training it will not earn you any points. A fairly complex range
                where there are a lot of different strategies with different frequencies being used by different combos
                will typically have a complexity score between 0.3 and 0.6. Only very chaotic ranges tend to get higher scores.
                Whenever you train a certain hand correctly, your training score will be increased exactly by the complexity of the range.
                To give an example, let's say you are training a range with complexity 0.25 for 100 hands, and answer 96 of the hands correctly.
                The training score for this session would then be 96 x 0.25 = 24.
              </SupportFaqItem>

              <div id='ranks'>
                <SupportFaqItem question='How does the ranking system work?'>
                  Based on your total training score you are promoted through the following ranks. Your rank will be visible
                  on your player profile as well as on the global leaderboards.
                  <div className='flex flex-col gap-2 p-3 w-fit my-4'>
                    {rankScoresSorted.map(score => (
                      <div key={'score' + score} className='grid grid-cols-2 gap-3 items-center'>
                        <div className='text-center'>
                          {withSeparators(score)}
                        </div>
                        <RankBanner
                          rank={getMilitaryRank(score)}
                          withName
                        />
                      </div>
                    ))}
                  </div>
                </SupportFaqItem>
              </div>
            </div>
          </div>
        }
        {page === 'termsAndConditions' &&
          <div className='max-w-[800px] mx-auto mb-32'>
            <h1 className='text-2xl text-neutral-500'>
              Terms & Conditions
            </h1>

            <p className='text-neutral-400 mb-5'>
              Last updated - November 2024
            </p>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>1. Introduction</h2>
              <p>Welcome to Hold'em Trainer ("Company", "we", "our", "us"). These Terms & Conditions ("Terms") govern your use of our software web-app, including any content, functionality, and services offered on or through Hold'em Trainer (the "Service").</p>
              <p>Please read these Terms carefully before using the Service. By using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you must not use our Service.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>2. Eligibility</h2>
              <p>By using our Service, you represent that you are at least 18 years of age and have the legal capacity to enter into these Terms. If you are under 18, you must have the consent of your parent or legal guardian to use our Service.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>3. Accounts & Subscriptions</h2>
              <p>To access certain features of the Service, you must create an account. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.</p>
              <p>Our Service offers subscription plans:</p>
              <ul>
                <li className='ml-1'>- Pro Plan: $7.99 per month</li>
                <li className='ml-1'>- Elite Plan: $9.99 per month</li>
              </ul>
              <p>All subscriptions are billed on a monthly basis. You can cancel your subscription at any time from your account settings. However, refunds for partial months will not be issued.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>4. Payment & Billing</h2>
              <p>All payments are processed securely through third-party payment processors. By providing your payment information, you authorize us to charge the applicable subscription fee. You agree to keep your billing information accurate and up to date.</p>
              <p>If a payment fails or is declined, your access to the Service may be suspended until the payment is successfully processed.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>5. Intellectual Property</h2>
              <p>All content, features, and functionality of the Service (including but not limited to text, graphics, logos, and software) are owned by the Company or its licensors and are protected by intellectual property laws. You may not use any content from the Service without our prior written permission.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>6. Prohibited Activities</h2>
              <p>While using the Service, you agree not to:</p>
              <ul>
                <li className='ml-1'>- Violate any applicable laws or regulations</li>
                <li className='ml-1'>- Infringe on the rights of others</li>
                <li className='ml-1'>- Upload or distribute viruses or malicious code</li>
                <li className='ml-1'>- Interfere with the security or functionality of the Service</li>
              </ul>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>7. Termination</h2>
              <p>We may suspend or terminate your account if you violate these Terms, or if we believe your use of the Service is harmful to us, other users, or third parties. Upon termination, you will no longer have access to the Service, and any rights granted to you under these Terms will immediately cease.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>8. Disclaimer of Warranties</h2>
              <p>The Service is provided on an "as-is" and "as-available" basis. We make no warranties or representations, express or implied, regarding the Service, including its availability, accuracy, or fitness for a particular purpose. Use of the Service is at your own risk.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>9. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, we will not be liable for any damages arising from your use or inability to use the Service, including but not limited to direct, indirect, incidental, or consequential damages, even if we have been advised of the possibility of such damages.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>10. Governing Law</h2>
              <p>These Terms are governed by the laws of Switzerland. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in the Canton of Zurich, Switzerland.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>11. Changes to the Terms</h2>
              <p>We may update these Terms from time to time. When we do, we will notify you by updating the date at the top of this page. Continued use of the Service after changes to the Terms will constitute your acceptance of the updated Terms.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>12. Contact Us</h2>
              <p>If you have any questions or concerns about these Terms, please contact us at info@holdem-trainer.com.</p>
            </div>
          </div>
        }
        {page === 'privacyPolicy' &&
          <div className='max-w-[800px] mx-auto'>
            <h1 className='text-2xl text-neutral-500'>
              Privacy Policy
            </h1>

            <p className='text-neutral-400 mb-5'>
              Last updated - November 2024
            </p>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>1. Introduction</h2>
              <p>Welcome to Hold'em Trainer ("Company", "we", "our", "us"). This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our software web-app Hold'em Trainer (the "Service").</p>
              <p>Please read this policy carefully. By using the Service, you agree to the collection and use of information in accordance with this policy. If you do not agree to this policy, please do not use our Service.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>2. Information We Collect</h2>
              <p>When you use our Service, we may collect personal information that you provide to us, such as:</p>
              <ul>
                <li className='ml-1'>- Name</li>
                <li className='ml-1'>- Email address</li>
                <li className='ml-1'>- Billing information (for subscription payments)</li>
                <li className='ml-1'>- Account credentials</li>
              </ul>
              <p>We may also collect information on how the Service is accessed and used, such as your IP address, browser type, device information, and pages you visit within our Service.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>3. How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including:</p>
              <ul>
                <li className='ml-1'>- To provide, maintain, and improve our Service</li>
                <li className='ml-1'>- To process payments for subscriptions</li>
                <li className='ml-1'>- To communicate with you regarding updates, promotions, or customer support</li>
                <li className='ml-1'>- To monitor and analyze usage and trends to improve user experience</li>
                <li className='ml-1'>- To detect and prevent fraud or other harmful activity</li>
              </ul>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>4. How We Share Your Information</h2>
              <p>We do not sell your personal information. However, we may share your information in the following circumstances:</p>
              <ul>
                <li className='ml-1'>- With service providers that help us operate the Service (e.g., payment processors, hosting providers)</li>
                <li className='ml-1'>- If required by law or to protect our legal rights</li>
                <li className='ml-1'>- In connection with any merger, sale, or transfer of all or part of our business</li>
              </ul>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>5. Data Security</h2>
              <p>We take reasonable steps to protect the security of your information. However, no method of transmission over the internet or method of electronic storage is completely secure, and we cannot guarantee absolute security.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>6. Your Data Rights</h2>
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul>
                <li className='ml-1'>- The right to access, update, or delete your personal information</li>
                <li className='ml-1'>- The right to withdraw consent at any time where we rely on your consent to process your information</li>
                <li className='ml-1'>- The right to object to or restrict the processing of your personal data</li>
                <li className='ml-1'>- The right to data portability</li>
              </ul>
              <p>To exercise any of these rights, please contact us at info@holdem-trainer.com. We may require you to verify your identity before processing your request.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>7. Third-Party Services</h2>
              <p>Our Service may contain links to third-party websites or services that are not operated by us. We have no control over and are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing them with any personal information.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>8. Children's Privacy</h2>
              <p>Our Service is not intended for use by individuals under the age of 18 ("Children"). We do not knowingly collect personal information from Children. If we discover that we have collected personal information from a Child without parental consent, we will delete that information promptly.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>9. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. When we do, we will notify you by updating the "Last Updated" date at the top of this page. Continued use of the Service after changes to this policy constitutes your acceptance of the updated Privacy Policy.</p>
            </div>

            <div className='mb-5 leading-6'>
              <h2 className='text-neutral-500'>10. Contact Us</h2>
              <p>If you have any questions or concerns about this Privacy Policy, please contact us at info@holdem-trainer.com.</p>
            </div>
          </div>
        }
      </div>
    </InfoLayout>
  )
}