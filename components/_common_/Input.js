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
    bg-inherit py-3 px-4 rounded outline-none text-sm
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
  value,
  onChange,
}) {
  return (
    <input
      className={`
        ${themes[theme]}
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