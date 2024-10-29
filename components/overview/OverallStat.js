import { withSeparators } from '@/lib/display'

export default function OverallStat({ icon, number, label }) {
  return (
    <div
      className='flex flex-col items-center xs:grid justify-center xs:items-baseline rounded gap-1 xs:gap-3'
      style={{ gridTemplateColumns: '1fr 35px 1fr' }}
    >
      <h1 className='text-2xl text-neutral-300 text-right'>
        {withSeparators(number)}
      </h1>
      <i className={`bi bi-${icon} text-neutral-700 text-lg justify-self-end hidden xs:block`}></i>
      <label className='text-neutral-500 uppercase tracking-wide text-sm text-nowrap'>
        {label}
      </label>
    </div>
  )
}