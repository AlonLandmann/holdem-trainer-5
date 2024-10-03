import Article from '@/components/_shared/Article'
import InfoLayout from '@/components/_layout/InfoLayout'

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