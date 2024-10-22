import InfoLayout from '@/components/_layout/InfoLayout'
import Hero from './Hero'
// import Hero2 from './Hero2'

export default function HomeRoot({ range }) {
  return (
    <InfoLayout>
      {/* <Hero2 /> */}
      <Hero range={range} />
    </InfoLayout>
  )
}