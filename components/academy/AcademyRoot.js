import InfoLayout from '@/components/_layout/InfoLayout'
import ArticleBanner from '@/components/academy/ArticleBanner'

export default function AcademyRoot({ articles }) {
  return (
    <InfoLayout>
      <div className='p-7 sm:p-10 flex flex-col items-center'>
        <div className='self-stretch flex flex-col items-center py-10'>
          <i className='bi bi-book text-7xl text-neutral-600 mb-8'></i>
          <h1 className='text-4xl sm:text-5xl mb-5 text-center'>
            Hold'em Academy
          </h1>
          <h4 className='max-w-[55ch] text-center text-neutral-400 mb-3 px-6'>
            Welcome to the Hold'em Academy. Learn Game-Theory-Optimal Texas Hold'em from the ground up with articles, prepared ranges, as well as in-depth videos.
          </h4>
        </div>
        <div className='flex flex-col gap-5 max-w-[900px] px-12 pb-10'>
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