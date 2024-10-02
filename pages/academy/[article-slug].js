import Page from '@/components/_common_/Page'
import ArticleRoot from '@/components/info/article/ArticleRoot'
import prisma from '@/lib/server/prisma'

export default function ArticlePage({ article }) {
  return (
    <Page title='Academy'>
      <ArticleRoot article={JSON.parse(article)} />
    </Page>
  )
}

export async function getServerSideProps(context) {
  const article = await prisma.article.findUnique({
    where: {
      slug: context.query['article-slug']
    },
    include: {
      author: true,
      ranges: true,
    }
  })

  return { props: { article: JSON.stringify(article) } }
}