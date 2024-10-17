export default function Setting({ label, condition = true, children }) {
  return !condition ? null : (
    <div className='flex items-center'>
      <label className='w-36 text-neutral-400'>
        {label}
      </label>
      {children}
    </div>
  )
}