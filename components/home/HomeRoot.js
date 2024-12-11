import InfoLayout from '@/components/_layout/InfoLayout'
import Hero from './Hero'
import UsageData from './UsageData'
import Steps from './Steps'
import Highlights from './Highlights'
import Contact from './Contact'
import FinalCta from './FinalCta'
import Button from '../_ui/Button'

export default function HomeRoot({ range }) {
  return (
    <InfoLayout isHome>
      <Hero />
      <Steps initialRange={range} />
      <UsageData />
      <Highlights />
      <Contact />
      {/* <FinalCta /> */}
      <div className='fixed bottom-4 right-4'>
        <Button
          theme='secondary'
          utilClasses='py-3 px-4'
          icon='arrow-up'
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        />
      </div>
    </InfoLayout>
  )
}