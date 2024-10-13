import { withSeparators } from '@/lib/display'

export default function OverallStat({ icon, number, label }) {
  return (
    <div className='relative flex flex-col justify-center items-center px-5 py-3 border rounded w-52 h-28 gap-2'>
      <i className={`bi bi-${icon} text-neutral-700 text-xl absolute top-1 right-2`}></i>
      <h1 className='text-3xl'>
        {withSeparators(number)}
      </h1>
      <label className='text-neutral-500 uppercase tracking-wide text-sm'>
        {label}
      </label>
    </div>
  )
}