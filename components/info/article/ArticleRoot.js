import Article from '@/components/_common_/Article'
import InfoLayout from '@/components/_common_/InfoLayout'

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