import Page from '@/components/_layout/Page'
import HomeRoot from '@/components/home/HomeRoot'
import prisma from '@/lib/prisma'
import { toClientFormat } from '@/lib/ranges'

export default function HomePage({ range, usageInfo, articles }) {
  return (
    <Page title="Hold'em Trainer">
      <HomeRoot
        range={JSON.parse(range)}
        // usageInfo={JSON.parse(usageInfo)}
        // articles={JSON.parse(articles)}
      />
    </Page>
  )
}

export async function getServerSideProps() {
  const range = await prisma.range.findFirst({
    where: {
      folder: {
        is: {
          userId: Number(process.env.SAMPLE_USER_ID),
        }
      }
    }
  })

  // const nrUsers = await prisma.user.count({})
  // const nrRanges = await prisma.range.count({})
  // const nrCombos = await prisma.trainingUnit.aggregate({
  //   _sum: {
  //     total: true,
  //   },
  // })

  // const articles = await prisma.article.findMany({
  //   where: {
  //     isPublished: true,
  //   },
  //   select: {
  //     id: true,
  //     publishedAt: true,
  //     imageUrl: true,
  //     readTime: true,
  //     level: true,
  //     title: true,
  //     slug: true,
  //     abstract: true,
  //   },
  //   orderBy: {
  //     id: 'asc'
  //   },
  //   skip: 1,
  //   take: 3,
  // })

  return {
    props: {
      range: JSON.stringify(toClientFormat(range)),
      // ranges: JSON.stringify(range.map(r => toClientFormat(r))),
      // usageInfo: JSON.stringify({ nrUsers, nrRanges, nrCombos: nrCombos._sum.total }),
      // articles: JSON.stringify(articles)
    }
  }
}