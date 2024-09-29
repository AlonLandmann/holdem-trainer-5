import Footer from '@/components/_common_/Footer'
import Navbar from '@/components/_common_/Navbar'

export default function InfoLayout({ children }) {
  return (
    <div className='bg-neutral-900 min-h-screen flex flex-col'>
      <Navbar />
      <div className='mb-auto'>
        {children}
      </div>
      <Footer />
    </div>
  )
}