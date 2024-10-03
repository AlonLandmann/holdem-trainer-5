import prisma from '@/lib/prisma'
import { kebabCase } from 'lodash'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'PUT':
        const updatedArticle = req.body

        await prisma.article.update({
          where: {
            id: updatedArticle.id
          },
          data: {
            author: {
              connect: {
                id: updatedArticle.authorId
              }
            },
            isPublished: updatedArticle.isPublished,
            imageUrl: updatedArticle.imageUrl,
            readTime: updatedArticle.readTime,
            level: updatedArticle.level,
            // category: updatedArticle.category,
            title: updatedArticle.title,
            slug: kebabCase(updatedArticle.title),
            abstract: updatedArticle.abstract,
            content: updatedArticle.content,
          }
        })

        return res.status(200).json({ success: true })

      default:
        return res.status(400).json({ success: false, message: 'Invalid request.' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}