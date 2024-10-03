import InfoLayout from '@/components/_common_/InfoLayout'
import ArticleBanner from '../../_common_/ArticleBanner'

export default function AcademyRoot({ articles }) {
  return (
    <InfoLayout>
      <div className='flex flex-col items-center'>
        <div className='self-stretch flex flex-col items-center p-12 pt-16'>
          <i className='bi bi-mortarboard text-7xl text-neutral-600 mb-8'></i>
          <h1 className='text-5xl mb-5'>
            Hold'em Academy
          </h1>
          <h4 className='max-w-[55ch] text-center text-neutral-400 mb-3'>
            Welcome to the Hold'em Academy. Learn Game-Theory-Optimal Texas Hold'em from the ground up with articles, prepared ranges, as well as in-depth videos.
          </h4>
        </div>
        <div className='flex flex-col gap-5 max-w-[900px] px-12 pb-20'>
          {articles.map(article => (
            <ArticleBanner
              key={'article' + article.id}
              article={article}
            />
          ))}
        </div>
      </div>
    </InfoLayout>
  )
}