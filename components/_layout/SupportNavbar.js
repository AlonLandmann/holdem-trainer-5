import { useRouter } from 'next/router'
import Button from '../_ui/Button'

export default function SupportNavbar({ page }) {
  const router = useRouter()

  return (
    <div className='flex flex-col gap-3 items-center py-14'>
      <h1 className='text-5xl mb-4'>
        <span className='font-decorative'>HT</span> - Support
      </h1>
      <div className='flex gap-4 border-b px-10'>
        <Button
          theme='link'
          utilClasses={`pb-1 border-b ${page === 'contact' ? 'border-neutral-500' : ''} px-1 -mb-[1px]`}
          text='Contact'
          onClick={() => { router.push('/support/contact') }}
        />
        <Button
          theme='link'
          utilClasses={`pb-1 border-b ${page === 'faq' ? 'border-neutral-500' : ''} px-1 -mb-[1px]`}
          text='FAQ'
          onClick={() => { router.push('/support/faq') }}
        />
        <Button
          theme='link'
          utilClasses={`pb-1 border-b ${page === 'terms and conditions' ? 'border-neutral-500' : ''} px-1 -mb-[1px]`}
          text='Terms & Conditions'
          onClick={() => { router.push('/support/terms-and-conditions') }}
        />
        <Button
          theme='link'
          utilClasses={`pb-1 border-b ${page === 'privacy policy' ? 'border-neutral-500' : ''} px-1 -mb-[1px]`}
          text='Privacy Policy'
          onClick={() => { router.push('/support/privacy-policy') }}
        />
      </div>
    </div>
  )
}