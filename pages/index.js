import Page from '@/components/_layout/Page'
import HomeRoot from '@/components/home/HomeRoot'
import prisma from '@/lib/prisma'
import { toClientFormat } from '@/lib/ranges'

export default function HomePage({ ranges }) {
  return (
    <Page title="Hold'em Trainer">
      <HomeRoot ranges={JSON.parse(ranges)} />
    </Page>
  )
}

export async function getServerSideProps() {
  const ranges = await prisma.range.findMany({
    where: {
      folder: {
        is: {
          userId: 73
        }
      }
    }
  })

  return { props: { ranges: JSON.stringify(ranges.map(r => toClientFormat(r))) } }
}