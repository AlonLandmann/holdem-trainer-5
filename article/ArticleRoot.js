import FooterLarge from '@/components/_common_/FooterLarge'
import Navbar from '@/components/_common_/Navbar'
import css from '@/styles/article/ArticleRoot.module.scss'
import Article from './Article'

export default function ArticleRoot({ article }) {
  return (
    <div className={css.container}>
      <Navbar />
      <div>
        <Article
          article={article}
        />
      </div>
      <FooterLarge />
    </div>
  )
}
