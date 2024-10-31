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
          userId: Number(process.env.SAMPLE_USER_ID),
        }
      }
    }
  })

  console.log(`RANGE FETCH LENGTH: ${ranges.length}`)

  const nrUsers = await prisma.user.count({})

  console.log(`NR_USERS FETCH: ${nrUsers}`)

  const nrRanges = await prisma.range.count({})

  console.log(`NR_RANGES FETCH: ${nrUsers}`)

  const nrCombos = await prisma.trainingUnit.aggregate({
    _sum: {
      total: true,
    },
  })

  console.log(`NR_COMBOS FETCH: ${nrCombos}`)

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

  console.log(`NR_ARTICLES FETCH LENGTH: ${articles.length}`)

  return {
    props: {
      ranges: JSON.stringify(ranges.map(r => toClientFormat(r))),
      usageInfo: JSON.stringify({ nrUsers, nrRanges, nrCombos: nrCombos._sum.total }),
      articles: JSON.stringify(articles)
    }
  }
}