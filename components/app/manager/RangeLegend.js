import { optionColor } from '@/lib/client/colors'
import { optionPercentage } from '@/lib/client/percentages'

export default function RangeLegend({ range }) {
  return (
    <div className='grow p-1'>
      {range.options.map((option, i) => (
        <div key={'option' + i} className='flex items-center gap-2'>
          <div
            className='w-2 h-4'
            style={{ background: optionColor(option, range.spot) }}
          >

          </div>
          <div className='grow flex justify-between'>
            <h3 className={option.size ? '' : 'capitalize'}>
              {option.size
                ? `${option.size} bb`
                : option.type
              }
            </h3>
            <div className='text-neutral-600'>
              {optionPercentage(range, option)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}