export default function SettingsGroup({ title, children }) {
  return (
    <div>
      <h3 className='text-neutral-500 mb-5 capitalize tracking-wide'>
        {title}
      </h3>
      <div className='flex flex-col gap-2'>
        {children}
      </div>
    </div>
  )
}