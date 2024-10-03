import InfoLayout from '@/components/_layout/InfoLayout'
import Article from '@/components/article/Article'

export default function ArticleRoot({ article, suggestions }) {

  return (
    <InfoLayout>
      <Article
        article={article}
        suggestions={suggestions}
      />
    </InfoLayout>
  )
}