export default function Input({
  utilClasses = '',
  name = '',
  type = 'text',
  placeholder = '',
  value,
  onChange,
}) {
  return (
    <input
      className={`
        bg-neutral-800 py-3 px-4 rounded-sm outline-none text-sm
        border border-transparent focus:border-neutral-700
        placeholder-neutral-600
        ${utilClasses}
      `}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}