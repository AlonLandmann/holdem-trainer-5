import Page from '@/components/_common_/Page'
import ArticleRoot from '@/components/info/article/ArticleRoot'
import prisma from '@/lib/server/prisma'

export default function ArticlePage({ article, suggestions }) {
  return (
    <Page title='Academy'>
      <ArticleRoot
        article={JSON.parse(article)}
        suggestions={JSON.parse(suggestions)}
      />
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

  const suggestions = await prisma.article.findMany({
    where: {
      slug: {
        not: context.query['article-slug']
      },
    },
    take: 3,
    select: {
      id: true,
      updatedAt: true,
      author: {
        select: {
          username: true
        }
      },
      imageUrl: true,
      readTime: true,
      level: true,
      title: true,
      slug: true,
      abstract: true,
    }
  })

  return {
    props: {
      article: JSON.stringify(article),
      suggestions: JSON.stringify(suggestions),
    }
  }
}