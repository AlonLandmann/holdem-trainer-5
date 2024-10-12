import { accuracy } from '@/lib/display'

export default function EndMain({ stats }) {
  const pointsEarned = stats.reduce((acc, curr) => (acc + (curr.correct ? curr.rangeComplexity : 0)), 0)

  return (
    <div
      className='p-8 flex flex-col justify-center items-center'
      style={{ minHeight: 'calc(100vh - 49px)' }}
    >
      <i className='bi bi-flag text-[100px] text-neutral-700 mb-4'></i>
      <h1 className='text-3xl mb-5'>
        Session complete!
      </h1>
      <div className='text-neutral-500 text-lg mb-2'>
        {stats.length} combos trained
      </div>
      <div className='text-neutral-500 text-lg mb-4'>
        {accuracy(stats)} accuracy
      </div>
      <div className='text-xl text-neutral-500 flex gap-2 items-baseline'>
        <i className='bi bi-plus text-3xl'></i>
        <div className='text-3xl text-neutral-200'>
          {pointsEarned.toFixed(2)}
        </div>
        <div>
          Points
        </div>
      </div>
    </div >
  )
}