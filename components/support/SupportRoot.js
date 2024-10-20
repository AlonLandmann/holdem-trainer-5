import InfoLayout from '@/components/_layout/InfoLayout'
import SupportFaqItem from './SupportFaqItem'

export default function SupportRoot() {
  return (
    <InfoLayout>
      <div className='p-10'>
        <div className='max-w-[800px] mx-auto mb-32'>
          <h1 className='text-2xl text-neutral-500 mb-5'>
            FAQ
          </h1>

          <div className='flex flex-col gap-5'>


            <SupportFaqItem
              question="Why should I use Hold'em Trainer?"
              answer={`
              Hold'em Trainer allows you to build your basic poker game step by step.
              The manager let's you gain an overview over your strategies pre- and post-flop,
              and the trainer allows you to drill as many hands as you want in any given spot.
              This is a much more efficient way to let the correct decisions become second nature,
              especially for the more uncommon scenarios. Playing live gets you 30 hands per hour at best,
              and while playing online let's you see more hands, it doesn't let you choose
              the area of the game you'd like to work on, and it also doesn't provide immediate feedback.
              With Hold'em Trainer you can train whatever you like, however often you like.
            `}
            />

            <SupportFaqItem
              question="How do I use Hold'em Trainer effectively?"
              answer={`
              
            `}
            />

            <SupportFaqItem
              question="When might it be useful to upgrade to a paid subscription?"
              answer={`
              
            `}
            />

            <SupportFaqItem
              question="I am new to poker, is Hold'em Trainer for me?"
              answer={`
              
            `}
            />


            <SupportFaqItem
              question="Setting up ranges is hard, how should I do it?"
              answer={`
              
            `}
            />

            <SupportFaqItem
              question='What is the purpose of linking ranges via the predecessor relation?'
              answer={`
              
            `}
            />

            <SupportFaqItem
              question='How am I supposed to train with the random number generator?'
              answer={`

            `}
            />

            <SupportFaqItem
              question='How is the point score calculated after a training session?'
              answer={`
              
            `}
            />

            <SupportFaqItem
              question='How does the ranking system work?'
              answer={`
              
            `}
            />

            <SupportFaqItem
              question='How can I give feedback to the developers?'
              answer={`
              
            `}
            />
          </div>
        </div>


        <div class='max-w-[800px] mx-auto mb-32'>
          <h1 className='text-2xl text-neutral-500'>
            Terms & Conditions
          </h1>

          <p className='text-neutral-400 mb-5'>
            Last updated - November 2024
          </p>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>1. Introduction</h2>
            <p>Welcome to Hold'em Trainer ("Company", "we", "our", "us"). These Terms & Conditions ("Terms") govern your use of our software web-app, including any content, functionality, and services offered on or through Hold'em Trainer (the "Service").</p>
            <p>Please read these Terms carefully before using the Service. By using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you must not use our Service.</p>
          </div>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>2. Eligibility</h2>
            <p>By using our Service, you represent that you are at least 18 years of age and have the legal capacity to enter into these Terms. If you are under 18, you must have the consent of your parent or legal guardian to use our Service.</p>
          </div>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>3. Accounts & Subscriptions</h2>
            <p>To access certain features of the Service, you must create an account. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.</p>
            <p>Our Service offers subscription plans:</p>
            <ul>
              <li className='ml-1'>- Pro Plan: $7.99 per month</li>
              <li className='ml-1'>- Elite Plan: $9.99 per month</li>
            </ul>
            <p>All subscriptions are billed on a monthly basis. You can cancel your subscription at any time from your account settings. However, refunds for partial months will not be issued.</p>
          </div>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>4. Payment & Billing</h2>
            <p>All payments are processed securely through third-party payment processors. By providing your payment information, you authorize us to charge the applicable subscription fee. You agree to keep your billing information accurate and up to date.</p>
            <p>If a payment fails or is declined, your access to the Service may be suspended until the payment is successfully processed.</p>
          </div>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>5. Intellectual Property</h2>
            <p>All content, features, and functionality of the Service (including but not limited to text, graphics, logos, and software) are owned by the Company or its licensors and are protected by intellectual property laws. You may not use any content from the Service without our prior written permission.</p>
          </div>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>6. Prohibited Activities</h2>
            <p>While using the Service, you agree not to:</p>
            <ul>
              <li className='ml-1'>- Violate any applicable laws or regulations</li>
              <li className='ml-1'>- Infringe on the rights of others</li>
              <li className='ml-1'>- Upload or distribute viruses or malicious code</li>
              <li className='ml-1'>- Interfere with the security or functionality of the Service</li>
            </ul>
          </div>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>7. Termination</h2>
            <p>We may suspend or terminate your account if you violate these Terms, or if we believe your use of the Service is harmful to us, other users, or third parties. Upon termination, you will no longer have access to the Service, and any rights granted to you under these Terms will immediately cease.</p>
          </div>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>8. Disclaimer of Warranties</h2>
            <p>The Service is provided on an "as-is" and "as-available" basis. We make no warranties or representations, express or implied, regarding the Service, including its availability, accuracy, or fitness for a particular purpose. Use of the Service is at your own risk.</p>
          </div>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>9. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, we will not be liable for any damages arising from your use or inability to use the Service, including but not limited to direct, indirect, incidental, or consequential damages, even if we have been advised of the possibility of such damages.</p>
          </div>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>10. Governing Law</h2>
            <p>These Terms are governed by the laws of Switzerland. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in the Canton of Zurich, Switzerland.</p>
          </div>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>11. Changes to the Terms</h2>
            <p>We may update these Terms from time to time. When we do, we will notify you by updating the date at the top of this page. Continued use of the Service after changes to the Terms will constitute your acceptance of the updated Terms.</p>
          </div>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>12. Contact Us</h2>
            <p>If you have any questions or concerns about these Terms, please contact us at info@holdem-trainer.com.</p>
          </div>
        </div>

        <div class='max-w-[800px] mx-auto'>
          <h1 className='text-2xl text-neutral-500'>
            Privacy Policy
          </h1>

          <p className='text-neutral-400 mb-5'>
            Last updated - November 2024
          </p>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>1. Introduction</h2>
            <p>Welcome to Hold'em Trainer ("Company", "we", "our", "us"). This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our software web-app Hold'em Trainer (the "Service").</p>
            <p>Please read this policy carefully. By using the Service, you agree to the collection and use of information in accordance with this policy. If you do not agree to this policy, please do not use our Service.</p>
          </div>

          <div class='mb-5 leading-6'>
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

          <div class='mb-5 leading-6'>
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

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>4. How We Share Your Information</h2>
            <p>We do not sell your personal information. However, we may share your information in the following circumstances:</p>
            <ul>
              <li className='ml-1'>- With service providers that help us operate the Service (e.g., payment processors, hosting providers)</li>
              <li className='ml-1'>- If required by law or to protect our legal rights</li>
              <li className='ml-1'>- In connection with any merger, sale, or transfer of all or part of our business</li>
            </ul>
          </div>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>5. Data Security</h2>
            <p>We take reasonable steps to protect the security of your information. However, no method of transmission over the internet or method of electronic storage is completely secure, and we cannot guarantee absolute security.</p>
          </div>

          <div class='mb-5 leading-6'>
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

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>7. Third-Party Services</h2>
            <p>Our Service may contain links to third-party websites or services that are not operated by us. We have no control over and are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing them with any personal information.</p>
          </div>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>8. Children's Privacy</h2>
            <p>Our Service is not intended for use by individuals under the age of 18 ("Children"). We do not knowingly collect personal information from Children. If we discover that we have collected personal information from a Child without parental consent, we will delete that information promptly.</p>
          </div>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>9. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. When we do, we will notify you by updating the "Last Updated" date at the top of this page. Continued use of the Service after changes to this policy constitutes your acceptance of the updated Privacy Policy.</p>
          </div>

          <div class='mb-5 leading-6'>
            <h2 className='text-neutral-500'>10. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us at info@holdem-trainer.com.</p>
          </div>
        </div>
      </div>
    </InfoLayout>
  )
}