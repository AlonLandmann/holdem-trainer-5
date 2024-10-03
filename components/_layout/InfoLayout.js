import Footer from '@/components/_layout/Footer'
import Navbar from '@/components/_layout/Navbar'

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