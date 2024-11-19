import Article from '@/components/article/Article'
import ArticleEditor from '@/components/article-editor/ArticleEditor'
import { useState } from 'react'
import { useUserData } from '@/hooks/useUserData'

export default function ArticleEditorRoot({ article, suggestions }) {
  const [user, loaded] = useUserData()
  const [copy, setCopy] = useState(article)

  return !copy || !loaded.info || user.info.role !== 'admin' ? null : (
    <div className='grid grid-cols-2'>
      <ArticleEditor
        copy={copy}
        setCopy={setCopy}
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