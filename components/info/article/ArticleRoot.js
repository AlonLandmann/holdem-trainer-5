import InfoLayout from '@/components/_common_/InfoLayout'
import Image from 'next/image'

const difficultyInfo = [
  { color: '#96dea9', background: '#3a6e48', suit: 'club', displayText: 'Beginner' },
  { color: '#8dd6e0', background: '#2e6067', suit: 'diamond', displayText: 'Intermediate' },
  { color: '#e29292', background: '#6c3b3b', suit: 'heart', displayText: 'Advanced' },
  { color: '#aaaaaa', background: '#151515', suit: 'spade', displayText: 'Expert' },
]

export default function ArticleRoot({ article }) {
  const { color, background, suit, displayText } = difficultyInfo[article.level - 1]

  return (
    <InfoLayout>
      <div className='w-full max-w-[640px] mx-auto px-5 py-12 fle flex-col gap-5'>
        <section className='flex flex-col gap-5'>
          <h1 className='text-3xl capitalize'>
            {article.title}
          </h1>
          <p className='pb-5 border-b text-neutral-500'>
            {article.abstract}
          </p>
          <div className='flex items-center gap-4 text-neutral-500 text-sm'>
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
              {article.author.username}
            </div>
            <div>
              {article.updatedAt.slice(0, 10)}
            </div>
          </div>
          <div className='relative overflow-hidden w-full aspect-[1.6] sepia mb-6'>
            <Image
              src={article.imageUrl}
              alt='Article Image'
              fill
              objectFit='cover'
            />
          </div>
        </section>
        <section className='leading-8 text-neutral-400'>
          {article.content}
        </section>
      </div>
    </InfoLayout>
  )
}