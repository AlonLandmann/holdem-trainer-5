export default function RankBanner({ rank, withName = false }) {
  if (rank === 'Recruit') return (
    <div className={`${withName ? 'text-lg' : 'text-sm'} text-neutral-500`}>
      Recruit
    </div>
  )

  const info = rank.split(' ')
  const suit = rank === 'Recruit' ? null : info[0]
  const militaryRank = rank === 'Recruit' ? 'Recruit' : info[1]
  const colorMap = {
    'Spade': { text: '#aaaaaa', background: '#151515' },
    'Heart': { text: '#e29292', background: '#6c3b3b' },
    'Diamond': { text: '#8dd6e0', background: '#2e6067' },
    'Club': { text: '#96dea9', background: '#3a6e48' },
  }

  const { text, background } = colorMap[suit]

  return (
    <div className='flex gap-2 items-center'>
      <div
        className='flex items-center gap-1 rounded py-1 px-2'
        style={{ color: text, background }}
      >
        {['Colonel', 'General'].includes(militaryRank) &&
          <i className='bi bi-x-lg'></i>
        }
        {['Captain', 'Major', 'General'].includes(militaryRank) &&
          < i className={`bi bi-suit-${suit.toLowerCase()}-fill`}></i>
        }
        {['Major'].includes(militaryRank) &&
          < i className={`bi bi-suit-${suit.toLowerCase()}-fill`}></i>
        }
        <i className={`bi bi-suit-${suit.toLowerCase()}-fill`}></i>
      </div>
      {withName &&
        <div className='text-lg text-neutral-500 truncate'>
          {rank}
        </div>
      }
    </div>
  )
}