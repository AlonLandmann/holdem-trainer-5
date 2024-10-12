import { accuracy } from '@/lib/display'
import Button from '../_ui/Button'

export default function SessionToolbar({ setPage, count, stats, nrCombos }) {
  return (
    <div className='border-b h-[49px] flex items-center px-3'>
      <h1 className='text-neutral-500 mr-auto'>
        Trainer
      </h1>
      <div className='font-mono text-sm text-neutral-500 mr-4'>
        {count} / {nrCombos}{stats.length ? ' · ' : ' '}{accuracy(stats)}
      </div>
      <Button
        theme='nice'
        utilClasses='h-[39px] px-3 gap-1 rounded-sm'
        icon='flag-fill'
        text='End Session'
        onClick={() => { setPage('end') }}
        disabled={count === 1}
      />
    </div>
  )
}