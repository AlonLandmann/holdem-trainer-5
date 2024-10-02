import { suitIcon, suits } from '@/lib/cards'
import css from '@/styles/articles/ArticlesMain.module.scss'
import Image from 'next/image'
import Button from '../_common_/Button'

export default function ArticlesMain({ articles }) {
  return (
    <div className={css.container}>
      {articles.map(article => (
        <div
          key={article.id}
          className={css.article}
          onClick={() => { window.open(`/articles/${article.slug}`, '_blank') }}
        >
          <div className={css.imageContainer}>
            <Image
              src={article.imageUrl}
              alt='article image'
              fill
              objectFit='cover'
            />
          </div>
          <div className={css.main}>
            <div className={css.title}>
              {article.title}
            </div>
            <div className={css.abstract}>
              {article.abstract}
            </div>
            <div className={css.bottomLine}>
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
              <div className={`${css.difficulty} ${css[suits[4 - article.difficultyLevel]]}`}>
                <i className={suitIcon(suits[4 - article.difficultyLevel])}></i>
                {' '}{['Beginner', 'Intermediate', 'Advanced', 'Expert'][article.difficultyLevel - 1]}
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
          </div>
        </div>
      ))}
    </div>
  )
}