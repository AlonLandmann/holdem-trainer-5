import { withSeparators } from '@/lib/display'

export default function UsageDataItem({ icon, number, text }) {
  return (
    <div className='flex flex-col items-center'>
      <i className={`bi bi-${icon} text-4xl xl:text-5xl text-neutral-700 mb-4 xl:mb-6`}></i>
      <div className='text-3xl xl:text-4xl mb-1 xl:mb-3'>
        {withSeparators(number)}
      </div>
      <div className='text-neutral-400 text-nowrap'>
        {text}
      </div>
    </div>
  )
}