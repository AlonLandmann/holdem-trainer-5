import InfoLayout from '../_layout/InfoLayout'
import SupportNavbar from '../_layout/SupportNavbar'

export default function PrivacyPolicyRoot() {
  return (
    <InfoLayout>
      <div className='p-7 xs:p-10'>
        <SupportNavbar page='privacy policy' />
        <div className='max-w-[640px] mx-auto'>
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
          <div className='leading-6'>
            <h2 className='text-neutral-500'>10. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us at info@holdem-trainer.com.</p>
          </div>
        </div>
      </div>
    </InfoLayout>
  )
}