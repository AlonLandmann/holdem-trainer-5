import Input from '@/components/_common_/Input'
import { positions } from '@/lib/shared/spots'
import { produce } from 'immer'

export default function Stacks({ range, setRange }) {
  function handleChange(event, i) {
    setRange(produce(draft => {
      draft.stacks[i] = event.target.value
    }))
  }

  return (
    <div className='p-3'>
      <h1 className='text-sm text-neutral-400 mb-2'>
        Stacks
      </h1>
      <div className='flex gap-1'>
        {positions.map((position, i) => (
          <div key={'position' + position}>
            <div className='text-neutral-500 text-xs text-center px-[3px] py-[5px]'>
              {position}
            </div>
            <Input
              theme='editor'
              utilClasses='spinner-less w-10 px-[3px] py-[5px] text-center'
              type='number'
              value={range.stacks[i]}
              onChange={e => handleChange(e, i)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}