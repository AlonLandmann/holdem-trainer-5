export default function LoadingDots({ utilClasses }) {
  return (
    <div className={`absolute w-full left-0 flex justify-center ${utilClasses}`}>
      <span className='inline-block animate-pulse'>·</span>
      <span className='inline-block animate-pulse [animation-delay:0.2s]'>·</span>
      <span className='inline-block animate-pulse [animation-delay:1s]'>·</span>
    </div>
  )
}