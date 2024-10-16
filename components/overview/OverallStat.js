import { withSeparators } from '@/lib/display'

export default function OverallStat({ icon, number, label }) {
  return (
    <div
      className='grid justify-center items-baseline rounded gap-3'
      style={{ gridTemplateColumns: '1fr 35px 1fr' }}
    >
      <h1 className='text-2xl text-neutral-300 text-right'>
        {withSeparators(number)}
      </h1>
      <i className={`bi bi-${icon} text-neutral-700 text-lg justify-self-end `}></i>
      <label className='text-neutral-500 uppercase tracking-wide text-sm'>
        {label}
      </label>
    </div>
  )
}