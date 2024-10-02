import { suitIcon, suits } from '@/lib/cards'
import css from '@/styles/article/Article.module.scss'
import Image from 'next/image'
import Button from '../_common_/Button'
import { validateUrl } from '@/lib/validate'
import TeX from './TeX'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Article({ article }) {
  const [ranges, setRanges] = useState([])

  useEffect(() => {
    (async () => {
      const matches = article.content.match(/@RANGE-[a-zA-Z0-9-]+@/g)
      const ids = [...new Set(matches ? matches.map(m => m.slice(1, -1)) : null)]
      const res = await axios.get(`/api/ranges?ids=${JSON.stringify(ids)}`)

      if (res.data.success) {
        setRanges(res.data.documents)
      }
    })()
  }, [])

  return !article ? null : (
    <div className={css.container}>
      <div className={css.title}>
        {article.title}
      </div>
      <div className={css.abstract}>
        {article.abstract}
      </div>
      <div className={css.bottomLine}>
        <div className={`${css.difficulty} ${css[suits[4 - article.difficultyLevel]]}`}>
          <i className={suitIcon(suits[4 - article.difficultyLevel])}></i>
          {' '}{['Beginner', 'Intermediate', 'Advanced', 'Expert'][article.difficultyLevel - 1]}
        </div>
        <div className={css.author}>
          {article.createdBy}
        </div>
        <div className={css.date}>
          {(article.edited ? article.edited : article.createdAt).slice(0, 10)}
        </div>
        <div className={css.readTime}>
          <i className='bi bi-clock-history'></i>{' '}
          {article.readTime}
        </div>
        <Button
          theme='border'
          icon={false ? 'bookmark-fill' : 'bookmark'}
          text={589}
          style={{
            padding: '4px 6px',
            fontSize: `clamp(11px, 1.6vw, 14px)`
          }}
        />
      </div>
      {validateUrl(article.imageUrl) &&
        <div className={css.imageContainer}>
          <Image
            src={article.imageUrl}
            alt='article image'
            fill
            objectFit='cover'
          />
        </div>
      }
      <section className={css.content}>
        <TeX
          tex={article.content}
          ranges={ranges}
        />
      </section>
      <section className={css.saveAndShare}>
        <Button
          theme='borderless'
          icon='youtube'
        />
        <Button
          theme='borderless'
          icon='twitter-x'
        />
        <Button
          theme='borderless'
          icon='discord'
        />
        <Button
          theme='border'
          icon={false ? 'bookmark-fill' : 'bookmark'}
          text={589}
          style={{
            marginLeft: 'auto',
            width: 'auto',
            padding: '4px 6px',
            fontSize: `clamp(11px, 1.6vw, 14px)`
          }}
        />
      </section>
      <section className={css.similar}>

      </section>
    </div>
  )
}