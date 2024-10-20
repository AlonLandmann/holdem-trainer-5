import InfoLayout from '../_layout/InfoLayout'
import SupportNavbar from '../_layout/SupportNavbar'

export default function TermsAndConditionsRoot() {
  return (
    <InfoLayout>
      <div className='py-5 px-10'>
        <SupportNavbar page='terms and conditions' />
        <div className='max-w-[800px] mx-auto'>
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
      </div>
    </InfoLayout>
  )
}