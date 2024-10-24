import InfoLayout from '@/components/_layout/InfoLayout'
import Hero from './Hero'
import UsageData from './UsageData'
import Steps from './Steps'
import Highlights from './Highlights'

export default function HomeRoot({ ranges, initialIndex, usageInfo }) {
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
    </InfoLayout>
  )
}