import Page from '@/components/_layout/Page'
import HomeRoot from '@/components/home/HomeRoot'
import prisma from '@/lib/prisma'
import { toClientFormat } from '@/lib/ranges'

export default function HomePage({ ranges, usageInfo, articles }) {
  return (
    <Page title="Hold'em Trainer">
      <HomeRoot
        ranges={JSON.parse(ranges)}
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
          userId: 2
        }
      }
    }
  })

  console.log('TEST')

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
      id: true,
      publishedAt: true,
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
    skip: 1,
    take: 3,
  })

  return {
    props: {
      ranges: JSON.stringify(ranges.map(r => toClientFormat(r))),
      usageInfo: JSON.stringify({ nrUsers, nrRanges, nrCombos: nrCombos._sum.total }),
      articles: JSON.stringify(articles)
    }
  }
}