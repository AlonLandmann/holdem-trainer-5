import Article from '@/components/article/Article'
import ArticleEditor from '@/components/article-editor/ArticleEditor'
import { useState } from 'react'

export default function ArticleEditorRoot({ article, suggestions, authors }) {
  const [copy, setCopy] = useState(article)

  return !copy ? null : (
    <div className='grid grid-cols-2'>
      <ArticleEditor
        copy={copy}
        setCopy={setCopy}
        authors={authors}
      />
      <div className='bg-neutral-900'>
        <Article
          article={copy}
          suggestions={suggestions}
        />
      </div>
    </div>
  )
}