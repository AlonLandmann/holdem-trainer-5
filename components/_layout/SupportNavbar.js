import { useRouter } from 'next/router'
import Button from '../_ui/Button'

export default function SupportNavbar() {
  const router = useRouter()

  return (
    <div className='flex flex-col gap-3 items-center py-14'>
      <h1 className='text-5xl'>
        <span className='font-decorative'>HT</span> - Support
      </h1>
      <div className='flex gap-8'>
        <Button
          theme='link'
          utilClasses=''
          text='Contact'
          onClick={() => { router.push('/support/contact') }}
        />
        <Button
          theme='link'
          utilClasses=''
          text='FAQ'
          onClick={() => { router.push('/support/faq') }}
        />
        <Button
          theme='link'
          utilClasses=''
          text='Terms & Conditions'
          onClick={() => { router.push('/support/terms-and-conditions') }}
        />
        <Button
          theme='link'
          utilClasses=''
          text='Privacy Policy'
          onClick={() => { router.push('/support/privacy-policy') }}
        />
      </div>
    </div>
  )
}