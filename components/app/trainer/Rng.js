export default function Rng({ randomNumber }) {
  return (
    <div className='flex items-baseline gap-2'>
      <div className='text-neutral-500'>
        RNG
      </div>
      <div className='text-neutral-400 text-2xl'>
        {randomNumber.toFixed(1)}
      </div>
    </div>
  )
}