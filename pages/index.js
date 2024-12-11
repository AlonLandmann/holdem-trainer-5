import Page from '@/components/_layout/Page'
import HomeRoot from '@/components/home/HomeRoot'
import prisma from '@/lib/prisma'
import { toClientFormat } from '@/lib/ranges'

export default function HomePage({ range }) {
  return (
    <Page title="Hold'em Trainer">
      <HomeRoot range={JSON.parse(range)} />
    </Page>
  )
}

export async function getServerSideProps() {
  const range = await prisma.range.findUnique({
    where: {
      id: Number(process.env.INITIAL_SAMPLE_RANGE_ID),
    },
  });

  return {
    props: {
      range: JSON.stringify(toClientFormat(range)),
    }
  }
}