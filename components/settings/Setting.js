export default function Setting({ label, condition = true, children }) {
  return !condition ? null : (
    <div className='flex items-center gap-4 h-[43px]'>
      <label className='min-w-56 text-neutral-400'>
        {label}
      </label>
      {children}
    </div>
  )
}