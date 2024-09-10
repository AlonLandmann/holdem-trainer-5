import Input from '@/components/_common_/Input'
import { positions, spotInfo } from '@/lib/shared/spots'
import { produce } from 'immer'
import { useEffect, useState, useTransition } from 'react'

export default function Stacks({ range, setRange, setError }) {
  const [stacks, setStacks] = useState(() => range.stacks)
  const [errors, setErrors] = useState(Array(6).fill(false))
  const [_, startTransition] = useTransition()
  const [mouseOver, setMouseOver] = useState(false)
  const locked = range.history.length > 0

  useEffect(() => {
    setStacks(range.stacks)
  }, [range.stacks])

  useEffect(() => {
    setError(errors.includes(true))
  }, [errors])

  function handleChange(event) {
    const { name, value } = event.target
    setStacks(produce(draft => { draft[Number(name)] = value }))

    if (!value || Number(value) <= 0) {
      return setErrors(produce(draft => { draft[Number(name)] = true }))
    }

    setErrors(produce(draft => { draft[Number(name)] = false }))
    startTransition(() => {
      setRange(produce(draft => {
        draft.stacks[Number(name)] = Number(value)
        draft.spot = spotInfo(draft.stacks, draft.history)

        if (Number(name) === 2) {
          for (let i = 0; i < draft.options.length; i++) {
            if (draft.options[i].size && draft.options[i].size > draft.stacks[2]) {
              draft.options.splice(i, 1)

              for (let j = 0; j < draft.matrix.length; j++) {
                const removed = draft.matrix[j].strategy.splice(i, 1)
                draft.matrix[j].strategy[i === 0 ? 0 : i - 1] += removed[0]
              }

              i--
            }
          }
        }
      }))
    })
  }

  return (
    <div
      className='relative border-b py-3 px-4 flex flex-col bg-neutral-[#202020] opacity-80'
      onMouseEnter={() => { setMouseOver(true) }}
      onMouseLeave={() => { setMouseOver(false) }}
    >
      {(locked && mouseOver) &&
        <div
          className='absolute top-[1px] left-[1px] rounded-sm flex justify-center items-center gap-2 bg-[#111111ee] z-10'
          style={{ height: 'calc(100% - 1px)', width: 'calc(100% - 1px)' }}
        >
          <i className='bi bi-lock'></i>
          <div>To edit stacks, reset history.</div>
        </div>
      }
      <div className='mb-3 flex items-center gap-4'>
        <h1 className='mr-auto text-neutral-400'>
          Stacks
        </h1>
        {locked &&
          <i className='bi bi-lock text-sm text-neutral-600'></i>
        }
      </div>
      <div className='grid grid-cols-6 justify-items-center items-center gap-[2px]'>
        {positions.map(position => (
          <div
            key={'position' + position}
            className='text-neutral-500 w-12 text-xs text-center px-[3px] py-[5px]'
          >
            {position}
          </div>
        ))}
        {positions.map((position, i) => (
          <Input
            key={'input' + position}
            name={String(i)}
            theme='editor'
            utilClasses='spinner-less w-12 px-[3px] py-[5px] text-center'
            type='number'
            value={stacks[i]}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  )
}