import Image from 'next/image'

const difficultyInfo = [
  { color: '#96dea9', background: '#3a6e48', suit: 'club', displayText: 'Beginner' },
  { color: '#8dd6e0', background: '#2e6067', suit: 'diamond', displayText: 'Intermediate' },
  { color: '#e29292', background: '#6c3b3b', suit: 'heart', displayText: 'Advanced' },
  { color: '#aaaaaa', background: '#151515', suit: 'spade', displayText: 'Expert' },
]

export default function ArticleBannerDemo({ article }) {
  const { color, background, suit, displayText } = difficultyInfo[article.level - 1]

  return (
    <div
      className='flex flex-col cursor-pointer transition hover:bg-[#242424] border rounded overflow-hidden max-w-72'
      onClick={() => { window.open(`/academy/${article.slug}`, '_blank') }}
    >
      <div className='relative overflow-hidden  sepia'>
        <Image
          className='object-cover'
          src={article.imageUrl}
          alt='Article Image'
          width={288}
          height={224}
        />
      </div>
      <div className='grow flex flex-col gap-3 py-4 pl-5 pr-6'>
        <h2 className='text-xl capitalize'>
          {article.title}
        </h2>
        <p className='text-neutral-500 text-sm mb-5'>
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
          <div className='ml-auto'>
            {article.publishedAt}
          </div>
        </div>
      </div>
    </div>
  )
}