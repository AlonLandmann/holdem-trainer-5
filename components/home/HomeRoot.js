import InfoLayout from '@/components/_layout/InfoLayout'
import Hero from './Hero'
import Hero2 from './Hero2'
import UsageData from './UsageData'

export default function HomeRoot({ ranges, usageInfo }) {
  return (
    <InfoLayout>
      <Hero2 />
      {/* <Hero ranges={ranges} /> */}
      <UsageData usageInfo={usageInfo} />
    </InfoLayout>
  )
}