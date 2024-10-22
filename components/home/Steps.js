import { useState } from 'react'
import Matrix from '../editor/Matrix'
import Legend from '../editor/Legend'

export default function Steps({ range }) {
  const [hovered, setHovered] = useState([])

  return (
    <section className='border-b py-32 px-20'>
      <div className='flex flex-wrap justify-center gap-28'>
        <div className='max-w-[500px]'>
          <h1 className='pt-28 text-4xl mb-8 text-neutral-500'>
            1. Define your strategy
          </h1>
          <p className='leading-8 text-lg text-neutral-300 mb-5'>
            In our editor you will be able to define ranges such as the one presented here (Under-The-Gun open).
            Each cell in the matrix corresponds to a particular combo of hole cards.
            Each larger grid cell contains combos with cards of the same value, and each smaller cell specifies the exact suits.
          </p>
          <p className='leading-8 text-lg text-neutral-300 mb-5'>
            The cells in the top right corner which action we want to take in this spot and how often.
            The cells in the bottom left give an indication of how frequently we find ourselves having each combo.
          </p>
          <p className='leading-8 text-lg text-neutral-300'>
            Hover over the items in the legend below the matrix to get a clear view of what we would like to do with each combo in the range.
          </p>
        </div>
        <div className='flex flex-col justify-around gap-5'>
          <Matrix
            range={range}
            selected={[]}
            setSelected={() => { }}
            hovered={hovered}
            setHovered={setHovered}
            optionHover={null}
            cellWidth={11}
          />
          <Legend
            range={range}
            setHovered={setHovered}
            setSelected={() => { }}
          />
        </div>
      </div>
      <div>
        <h1 className='text-4xl'>
          2. Train it
        </h1>
      </div>
    </section>
  )
}