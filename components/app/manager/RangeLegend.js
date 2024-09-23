import { optionColor } from '@/lib/client/colors'

export default function RangeLegend({ range }) {
  return (
    <div className='p-1'>
      {range.options.map((option, i) => (
        <div key={'option' + i} className='flex items-center gap-2'>
          <div
            className='w-2 h-4'
            style={{ background: optionColor(option, range.spot) }}
          >

          </div>
          <h3 className={option.size ? '' : 'capitalize'}>
            {option.size
              ? `${option.size} bb`
              : option.type
            }
          </h3>
        </div>
      ))}
    </div>
  )
}