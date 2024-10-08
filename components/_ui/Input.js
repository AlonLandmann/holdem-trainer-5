const themes = {
  default: `
    bg-neutral-800 py-3 px-4 rounded-sm outline-none text-sm
    border border-transparent focus:border-neutral-700
    placeholder-neutral-600
  `,
  rename: `
    bg-transparent outline-none
  `,
  editor: `
    bg-inherit py-3 px-4 outline-none text-sm rounded
    border focus:border-neutral-700 text-neutral-400
    placeholder-neutral-600
  `
}

export default function Input({
  theme = 'default',
  utilClasses = '',
  name = '',
  type = 'text',
  placeholder = '',
  min = undefined,
  max = undefined,
  step = 1,
  value,
  onChange,
  onDragOver = (e) => { e.preventDefault() },
  onDrop = (e) => { e.preventDefault() },
}) {
  return (
    <input
      className={`${themes[theme]} ${utilClasses}`}
      name={name}
      type={type}
      min={min}
      max={max}
      step={step}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onDragOver={onDragOver}
      onDrop={onDrop}
    />
  )
}