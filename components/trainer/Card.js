import { suitIcon } from '@/lib/cards'
import { scaleTableElement } from '@/lib/scaling'

const DEFAULT_WIDTH = 710

export default function Card({ card, small = false, tableWidth = DEFAULT_WIDTH }) {
  return (
    <div
      className={`
        relative  flex justify-center items-center
        ${small ? 'h-[35px] w-[23px] text-sm rounded-sm' : 'h-[50px] w-[33px] text-lg rounded-[3px]'}
        text-neutral-400 overflow-hidden
        ${(card && card[1] === 's') ? 'bg-[#151515]' : ''}
        ${(card && card[1] === 'h') ? 'bg-[#6c3b3b]' : ''}
        ${(card && card[1] === 'd') ? 'bg-[#2e6067]' : ''}
        ${(card && card[1] === 'c') ? 'bg-[#3a6e48]' : ''}
        ${!card ? 'bg-[repeating-linear-gradient(-45deg,_#888,_#888_4px,_#555_4px,_#555_8px)]' : ''}
      `}
      style={{
        width: scaleTableElement(33, tableWidth, 0.5),
        height: scaleTableElement(50, tableWidth, 0.5),
        fontSize: scaleTableElement(20, tableWidth, 0.5, 10)
      }}
    >
      {card ? card[0] : ''}
      {card &&
        <div
          className={`
            absolute ${small ? 'left-0' : 'left-1'} text-5xl
            ${card[1] === 's' ? 'opacity-5' : 'opacity-15'}
          `}
          style={{
            top: scaleTableElement(15, tableWidth, 0.5),
            left: scaleTableElement(5, tableWidth, 0.5),
          }}
        >
          <i className={suitIcon(card[1])}></i>
        </div>
      }
    </div>
  )
}