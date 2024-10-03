import Button from '@/components/_ui/Button'
import { capitalize } from 'lodash'

export default function AnswerButtons({ range, handleCheckAnswer }) {
  return (
    <div className='max-w-[640px] flex justify-center flex-wrap gap-[10px]'>
      {range.options.map((option, i) => (
        <Button
          key={'option' + i}
          theme='answer'
          hotkey={String(i + 1)}
          text={option.size ? `${option.size} bb` : capitalize(option.type)}
          onClick={() => { handleCheckAnswer(option) }}
        />
      ))}
    </div>
  )
}
