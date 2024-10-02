import Image from 'next/image'

export default function ArticleBanner({ article }) {
  const difficultyInfo = [
    { color: '#96dea9', background: '#3a6e48', suit: 'club', displayText: 'Beginner' },
    { color: '#8dd6e0', background: '#2e6067', suit: 'diamond', displayText: 'Intermediate' },
    { color: '#e29292', background: '#6c3b3b', suit: 'heart', displayText: 'Advanced' },
    { color: '#aaaaaa', background: '#151515', suit: 'spade', displayText: 'Expert' },
  ]

  const { color, background, suit, displayText } = difficultyInfo[article.level - 1]

  return (
    <div
      className='border rounded p-2 flex gap-4 bg-[#202020] opacity-80 cursor-pointer transition hover:bg-[#242424]'
      onClick={() => { window.location = `/academy/${article.slug}` }}
    >
      <div className='relative rounded overflow-hidden min-h-56 min-w-56'>
        <Image
          src={article.imageUrl}
          alt='Article Image'
          fill
          objectFit='cover'
        />
      </div>
      <div className='grow flex flex-col gap-3'>
        <h2 className='text-xl pr-2 capitalize'>
          {article.title}
        </h2>
        <p className='text-neutral-400 pr-2'>
          {article.abstract}
        </p>
        <div className='mt-auto flex items-center gap-4 text-neutral-500 text-sm'>
          <div>
            {article.author.username}
          </div>
          <div>
            {article.updatedAt.slice(0, 10)}
          </div>
          <div className='flex items-baseline gap-[6px]'>
            <i className='bi bi-clock-history'></i>
            {article.readTime}
          </div>
          <div
            className='flex items-center gap-2 rounded-[3px] py-[2px] px-[6px] opacity-80'
            style={{ color, background }}
          >
            <i className={`bi bi-suit-${suit}-fill`}></i>
            {' '}{displayText}
          </div>
        </div>
      </div>
    </div>
  )
}