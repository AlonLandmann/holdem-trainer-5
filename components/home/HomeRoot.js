import InfoLayout from '@/components/_layout/InfoLayout'
import Hero from './Hero'
import UsageData from './UsageData'
import Steps from './Steps'
import Highlights from './Highlights'
import Contact from './Contact'
import AcademyBanner from './AcademyBanner'

export default function HomeRoot({ ranges, initialIndex, usageInfo, articles }) {
  return (
    <InfoLayout>
      <Hero />
      <Steps
        ranges={ranges}
        initialIndex={initialIndex}
      />
      <UsageData
        usageInfo={usageInfo}
      />
      <Highlights />
      <AcademyBanner
        articles={articles}
      />
      <Contact />
    </InfoLayout>
  )
}