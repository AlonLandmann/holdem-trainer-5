import Page from '@/components/_common_/Page'
import ArticleEditorRoot from '@/components/admin/article-editor/ArticleEditorRoot'
import prisma from '@/lib/server/prisma'
import { random } from 'lodash'

export default function ArticleEditorPage({ article, suggestions, authors }) {
  return (
    <Page title='Article Editor'>
      <ArticleEditorRoot
        article={JSON.parse(article)}
        suggestions={JSON.parse(suggestions)}
        authors={authors}
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

  const nrOtherArticles = await prisma.article.count({
    where: {
      slug: {
        not: context.query['article-slug']
      },
      isPublished: true,
    }
  })

  const suggestions = await prisma.article.findMany({
    where: {
      slug: {
        not: context.query['article-slug']
      },
      isPublished: true,
    },
    take: 3,
    skip: Math.max(0, random(nrOtherArticles - 3)),
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
    },
  })

  const authors = await prisma.user.findMany({
    where: {
      role: 'Admin'
    },
    select: {
      id: true,
      username: true,
    }
  })

  return {
    props: {
      article: JSON.stringify(article),
      suggestions: JSON.stringify(suggestions),
      authors,
    }
  }
}