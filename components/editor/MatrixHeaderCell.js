import { includingValue } from '@/lib/cards'

export default function MatrixHeaderCell({ value, position, setHovered, blockWidth, headlineWidth, suitArrayWidth }) {  
  return (
    <div
      className={`flex border-r border-b ${position === 'top' ? 'flex-col border-t' : 'border-l'}`}
      onMouseLeave={() => { if (position === 'top') { setHovered([]) } }}
      onMouseEnter={() => { if (position === 'top') { setHovered(includingValue(value)) } }}
      style={{
        width: position === 'top' ? `${blockWidth + 1}px` : `${headlineWidth}px`,
        height: position === 'top' ? `${headlineWidth}px` : `${blockWidth + 1}px`
      }}
    >
      <div className='grow flex justify-center items-center text-sm text-neutral-400'>
        {value}
      </div>
      <div
        className={`
          grid ${position === 'top' ? 'grid-cols-4' : 'grid-rows-4'}
          justify-items-center items-center text-neutral-800 leading-none
        `}
        style={position === 'top'
          ? { height: `${suitArrayWidth}px` }
          : { width: `${suitArrayWidth}px` }
        }
      >
        <div className='text-[10px]'>
          <i className='bi bi-suit-spade-fill'></i>
        </div>
        <div className='text-[9px]'>
          <i className='bi bi-suit-heart-fill'></i>
        </div>
        <div className='text-[10px]'>
          <i className='bi bi-suit-diamond-fill'></i>
        </div>
        <div className='text-[10px]'>
          <i className='bi bi-suit-club-fill'></i>
        </div>
      </div>
    </div>
  )
}