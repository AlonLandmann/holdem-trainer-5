import InfoFooter from '@/components/_layout/InfoFooter'
import InfoNavbar from '@/components/_layout/InfoNavbar'

export default function InfoLayout({ children }) {
  return (
    <div className='min-h-screen bg-neutral-900 flex flex-col'>
      <InfoNavbar />
      <div className='mb-auto'>
        {children}
      </div>
      <InfoFooter />
    </div>
  )
}