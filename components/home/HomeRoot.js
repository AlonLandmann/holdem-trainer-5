import InfoLayout from '@/components/_layout/InfoLayout'
import Demo from './Demo'
import Hero from './Hero'
import UsageData from './UsageData'

export default function HomeRoot({ ranges, usageInfo }) {
  return (
    <InfoLayout>
      <Hero />
      <Demo ranges={ranges} />
      <UsageData usageInfo={usageInfo} />
    </InfoLayout>
  )
}