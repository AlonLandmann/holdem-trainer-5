import { withSeparators } from '@/lib/display'

export default function UsageDataItem({ icon, number, text }) {
  return (
    <div className='flex flex-col items-center'>
      <i className={`bi bi-${icon} text-5xl text-neutral-700 mb-6`}></i>
      <div className='text-4xl mb-3'>
        {withSeparators(number)}
      </div>
      <div className='text-neutral-400'>
        {text}
      </div>
    </div>
  )
}