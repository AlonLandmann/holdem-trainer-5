export default function SettingsGroup({ title, children }) {
  return (
    <div>
      <h3 className='mb-1 text-neutral-400 bg-neutral-800 py-2 px-3 rounded-sm bg-opacity-40'>
        {title}
      </h3>
      <div className='p-3 flex flex-col gap-1'>
        {children}
      </div>
    </div>
  )
}