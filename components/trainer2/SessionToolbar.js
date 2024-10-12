import { accuracy } from '@/lib/display'

export default function SessionToolbar({ count, stats, nrCombos }) {
  return (
    <div className='border-b h-[49px] flex items-center px-3'>
      <h1 className='text-neutral-500 mr-auto'>
        Trainer
      </h1>
      <div className='font-mono text-sm text-neutral-500'>
        {count - 1} / {nrCombos} {accuracy(stats)}
      </div>
    </div>
  )
}