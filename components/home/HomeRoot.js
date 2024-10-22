import InfoLayout from '@/components/_layout/InfoLayout'
import Demo from './Demo'
import Hero from './Hero'
import UsageData from './UsageData'
import Steps from './Steps'

export default function HomeRoot({ ranges, initialIndex, usageInfo }) {
  return (
    <InfoLayout>
      <Hero />
      <Steps range={ranges[initialIndex]} />
      <UsageData usageInfo={usageInfo} />
      <Demo
        ranges={ranges}
        initialIndex={initialIndex}
      />
    </InfoLayout>
  )
}