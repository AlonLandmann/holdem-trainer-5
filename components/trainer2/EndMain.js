import { accuracy } from "@/lib/display";

export default function EndMain({ stats }) {
  return (
    <div
      className='p-8 flex flex-col justify-center items-center'
      style={{ minHeight: 'calc(100vh - 49px)' }}
    >
      <i className='bi bi-flag text-[100px] text-neutral-700 mb-4'></i>
      <h1 className='text-3xl mb-4'>
        Session complete!
      </h1>
      <div className='text-neutral-500 text-lg mb-2'>
        {stats.length} combos trained
      </div>
      <div className='text-neutral-500 text-lg'>
        {accuracy(stats)} accuracy
      </div>
    </div>
  )
}