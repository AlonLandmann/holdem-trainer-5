import css from '@/styles/article-editor/ArticleEditorRoot.module.scss'
import Navbar from '../_common_/Navbar'
import FooterLarge from '../_common_/FooterLarge'
import ArticleEditorMain from './ArticleEditorMain'
import ArticleEditorToolbar from './ArticleEditorToolbar'
import { useState } from 'react'

export default function ArticleEditorRoot({ article }) {
  const [current, setCurrent] = useState(article)

  return (
    <div className={css.container}>
      <Navbar>
        <ArticleEditorToolbar
          article={current}
          setArticle={setCurrent}
        />
      </Navbar>
      <div>
        <ArticleEditorMain
          article={current}
          setArticle={setCurrent}
        />
      </div>
      <FooterLarge />
    </div>
  )
}