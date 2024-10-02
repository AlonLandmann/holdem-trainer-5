import FooterLarge from '@/components/_common_/FooterLarge'
import Navbar from '@/components/_common_/Navbar'
import css from '@/styles/articles/ArticlesRoot.module.scss'
import { useState } from 'react'
import ArticlesToolbar from './ArticlesToolbar'
import { uniq } from 'lodash'
import ArticlesMain from './ArticlesMain'

export default function ArticlesRoot({ articles }) {
  const [bookmarked, setBookmarked] = useState(false)
  const [searchString, setSearchString] = useState('')
  const categories = articles ? uniq(articles.map(a => a.category)) : []
  const [category, setCategory] = useState(categories.length ? categories[0] : null)
  
  return (
    <div className={css.container}>
      <Navbar>
        <ArticlesToolbar
          categories={categories}
          category={category}
          setCategory={setCategory}
          bookmarked={bookmarked}
          setBookmarked={setBookmarked}
          searchString={searchString}
          setSearchString={setSearchString}
        />
      </Navbar>
      <div>
        <ArticlesMain
          articles={articles.filter(a => a.category == category)}
        />
      </div>
      <FooterLarge />
    </div>
  )
}
