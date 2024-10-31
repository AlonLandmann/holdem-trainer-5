import { accuracy } from '@/lib/display'
import Button from '../_ui/Button'

export default function SessionToolbar({ setPage, count, stats, nrCombos }) {
  return (
    <div className='border-b h-[49px] flex items-center px-3'>
      <h1 className='hidden xs:inline-block text-neutral-500'>
        Trainer
      </h1>
      <div className='font-mono text-sm text-neutral-500 ml-auto mr-4 text-nowrap'>
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