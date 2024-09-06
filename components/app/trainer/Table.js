import { suitIcon } from '@/lib/shared/cards'

export default function Table({ spot, holeCards, heroPosition, flash }) {
  return (
    <div className='relative h-[510px] w-[710px] flex justify-center items-center'>
      <div className={`
        h-[350px] w-[640px] border rounded-[175px] flex
        justify-center items-center bg-[#181818]
        ${flash === 'correct' ? 'border-[#66c24a]' : ''}
        ${flash === 'incorrect' ? 'border-[#c43333]' : ''}
      `}>
        <div className='absolute z-10 rounded-[3px] p-1 flex gap-1 bg-[#11111188]'>
          {spot.board.map((card, i) => (
            <div
              key={'card' + i}
              className={`
                relative h-[50px] w-[33px] rounded-[3px] flex justify-center
                items-center text-neutral-400 text-lg overflow-hidden
                ${card[1] === 's' ? 'bg-[#151515]' : ''}
                ${card[1] === 'h' ? 'bg-[#6c3b3b]' : ''}
                ${card[1] === 'd' ? 'bg-[#2e6067]' : ''}
                ${card[1] === 'c' ? 'bg-[#3a6e48]' : ''}
              `}
            >
              {card[0]}
              <div className='absolute top-4 left-1 text-5xl opacity-5'>
                <i className={suitIcon(card[1])}></i>
              </div>
            </div>
          ))}
        </div>
        <div className='relative h-[290px] w-[580px] rounded-[145px] flex justify-center items-center text-[100px] bg-[#141414]'>
          <div className='font-decorative text-neutral-800 select-none text-[100px]'>
            HT
          </div>
        </div>
      </div>
    </div>
  )
}