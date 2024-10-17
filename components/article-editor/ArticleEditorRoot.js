import Article from '@/components/article/Article'
import ArticleEditor from '@/components/article-editor/ArticleEditor'
import { useState } from 'react'
import { useUser } from '@/hooks/useUser'

export default function ArticleEditorRoot({ article, suggestions, authors }) {
  const [user, setUser] = useUser()
  const [copy, setCopy] = useState(article)

  return !copy || !user || user.role !== 'admin' ? null : (
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