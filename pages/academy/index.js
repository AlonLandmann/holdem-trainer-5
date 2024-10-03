import Page from '@/components/_layout/Page'
import AcademyRoot from '@/components/academy/AcademyRoot'
import prisma from '@/lib/prisma'

export default function AcademyPage({ articles }) {
  return (
    <Page title='Academy'>
      <AcademyRoot articles={JSON.parse(articles)} />
    </Page>
  )
}

export async function getServerSideProps() {
  const articles = await prisma.article.findMany({
    where: {
      isPublished: true,
    },
    include: {
      author: true,
    }
  })

  return { props: { articles: JSON.stringify(articles) } }
}