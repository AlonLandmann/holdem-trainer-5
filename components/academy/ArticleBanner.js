import Image from 'next/image'

const difficultyInfo = [
  { color: '#96dea9', background: '#3a6e48', suit: 'club', displayText: 'Beginner' },
  { color: '#8dd6e0', background: '#2e6067', suit: 'diamond', displayText: 'Intermediate' },
  { color: '#e29292', background: '#6c3b3b', suit: 'heart', displayText: 'Advanced' },
  { color: '#aaaaaa', background: '#151515', suit: 'spade', displayText: 'Expert' },
]

export default function ArticleBanner({ article }) {
  const { color, background, suit, displayText } = difficultyInfo[article.level - 1]

  return (
    <div
      className='flex cursor-pointer transition hover:bg-[#242424] border rounded overflow-hidden'
      onClick={() => { window.location = `/academy/${article.slug}` }}
    >
      <div className='relative overflow-hidden min-h-56 min-w-56 sepia rounded-[3px]'>
        <Image
          src={article.imageUrl}
          alt='Article Image'
          fill
          objectFit='cover'
        />
      </div>
      <div className='grow flex flex-col gap-3 py-4 pl-5 pr-6'>
        <h2 className='text-xl capitalize'>
          {article.title}
        </h2>
        <p className='text-neutral-500 text-sm'>
          {article.abstract}
        </p>
        <div className='mt-auto flex items-center gap-4 text-neutral-500 text-sm'>
          <div
            className='flex items-center gap-2 rounded-[3px] py-[2px] px-[6px]'
            style={{ color, background }}
          >
            <i className={`bi bi-suit-${suit}-fill`}></i>
            <span>{displayText}</span>
          </div>
          <div className='flex items-baseline gap-[6px]'>
            <i className='bi bi-clock-history'></i>
            {article.readTime}
          </div>
          <div className='ml-auto'>
            {article.publishedAt}
          </div>
        </div>
      </div>
    </div>
  )
}