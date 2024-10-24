import Page from '@/components/_layout/Page'
import HomeRoot from '@/components/home/HomeRoot'
import prisma from '@/lib/prisma'
import { toClientFormat } from '@/lib/ranges'
import { includes, random } from 'lodash'

export default function HomePage({ ranges, initialIndex, usageInfo, articles }) {
  return (
    <Page title="Hold'em Trainer">
      <HomeRoot
        ranges={JSON.parse(ranges)}
        initialIndex={initialIndex}
        usageInfo={JSON.parse(usageInfo)}
        articles={JSON.parse(articles)}
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

  const initialIndex = random(ranges.length - 1)

  const nrUsers = await prisma.user.count({})
  const nrRanges = await prisma.range.count({})
  const nrCombos = await prisma.trainingUnit.aggregate({
    _sum: {
      total: true,
    },
  })

  const articles = await prisma.article.findMany({
    where: {
      isPublished: true,
    },
    select: {
      createdAt: true,
      author: {
        select: {
          username: true,
        }
      },
      imageUrl: true,
      readTime: true,
      level: true,
      title: true,
      slug: true,
      abstract: true,
    },
    orderBy: {
      id: 'asc'
    },
    take: 3,
  })

  return {
    props: {
      ranges: JSON.stringify(ranges.map(r => toClientFormat(r))),
      initialIndex,
      usageInfo: JSON.stringify({ nrUsers, nrRanges, nrCombos: nrCombos._sum.total }),
      articles: JSON.stringify(articles)
    }
  }
}