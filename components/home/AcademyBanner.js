import Button from '../_ui/Button'
import ArticleBannerDemo from './ArticleBannerDemo'

export default function AcademyBanner({ articles }) {
  return (
    <section className='flex flex-col items-center py-32 px-20 bg-neutral-800 bg-opacity-10 border-t border-b'>
      <i className='bi bi-book text-7xl text-neutral-600 mb-8'></i>
      <h1 className='text-4xl mb-4'>
        Hold'em Academy
      </h1>
      <h2 className='text-lg text-neutral-500 mb-8 max-w-[500px] text-center'>
        Learn Game-Theory-Optimal Texas Hold'em from the ground up with articles, prepared ranges, as well as in-depth videos.
      </h2>
      <Button
        theme='secondary'
        utilClasses='py-3 px-4 mb-12'
        text="Visit Hold'em Academy"
        onClick={() => { window.open('/academy',  '_blank') }}
      />
      <div className='flex gap-5'>
        {articles.map(article => (
          <ArticleBannerDemo
            key={'article' + article.id}
            article={article}
          />
        ))}
      </div>
    </section>
  )
}