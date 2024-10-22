import Page from '@/components/_layout/Page'
import HomeRoot from '@/components/home/HomeRoot'
import prisma from '@/lib/prisma'
import { toClientFormat } from '@/lib/ranges'
import { random } from 'lodash'

export default function HomePage({ ranges, initialIndex, usageInfo }) {
  return (
    <Page title="Hold'em Trainer">
      <HomeRoot
        ranges={JSON.parse(ranges)}
        initialIndex={initialIndex}
        usageInfo={JSON.parse(usageInfo)}
      />
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

  const nrUsers = await prisma.user.count({})
  const nrRanges = await prisma.range.count({})
  const nrCombos = await prisma.trainingUnit.aggregate({
    _sum: {
      total: true,
    },
  })

  const initialIndex = random(ranges.length - 1)

  return {
    props: {
      ranges: JSON.stringify(ranges.map(r => toClientFormat(r))),
      initialIndex,
      usageInfo: JSON.stringify({ nrUsers, nrRanges, nrCombos: nrCombos._sum.total }),
    }
  }
}