import { useState } from 'react'
import Button from '../_ui/Button'
import Matrix from '../editor/Matrix'
import Table from '../trainer/Table'
import { sample } from 'lodash'

export default function Hero({ ranges }) {
  const [hovered, setHovered] = useState([])
  const [range, setRange] = useState(ranges[12])
  
  return (
    <section className='flex flex-wrap justify-center gap-10 p-10'>
      <div className='flex flex-col justify-around'>
        <div className='max-w-[50ch] flex flex-col text-start z-20'>
          <h1 className='mb-5 m-w-[500px] text-3xl font-medium text-neutral-50 md:text-4xl'>
            Refine your game
          </h1>
          <h3 className='mb-7 max-w-[500px] text-neutral-300 text-sm md:text-base'>
            Create your own custom poker ranges and train them on Hold'em Trainer for free.
          </h3>
          <div className='flex gap-3'>
            <Button
              theme='nice'
              utilClasses='rounded-sm py-3 px-4 bg-opacity-80'
              text='Create an account'
              onClick={() => { window.location = '/auth/signup' }}
            />
            <Button
              theme='secondary'
              utilClasses='rounded-sm py-3 px-4 bg-opacity-100 bg-neutral-900'
              text='Watch user guide'
              onClick={() => { window.open('https://www.youtube.com/watch?v=z6PkfQihrUc', '_blank') }}
            />
          </div>
        </div>
        <Table
          spot={range.spot}
          holeCards='AsKs'
          heroPosition={0}
          flash={false}
        />
      </div>
      <Matrix
        range={range}
        selected={[]}
        setSelected={() => { }}
        hovered={hovered}
        setHovered={setHovered}
        optionHover={null}
      />
    </section>
  )
}