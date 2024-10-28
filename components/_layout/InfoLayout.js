import InfoFooter from '@/components/_layout/InfoFooter'
import InfoNavbar from '@/components/_layout/InfoNavbar'

export default function InfoLayout({ children, isHome = false }) {
  return (
    <div className='relative min-h-screen bg-neutral-900 flex flex-col'>
      <InfoNavbar isHome={isHome} />
      <div className='mb-auto'>
        {children}
      </div>
      <InfoFooter />
    </div>
  )
}