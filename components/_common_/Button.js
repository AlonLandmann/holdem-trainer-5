const themes = {
  primary: {
    container: 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600',
    icon: '',
    text: '',
  },
  secondary: {
    container: '',
    icon: '',
    text: '',
  },
  tertiary: {
    container: '',
    icon: '',
    text: '',
  },
}

export default function Button({
  theme = 'primary',
  utilClasses = '',
  icon,
  text,
  type = 'button',
  onClick = () => { },
  disabled = false,
}) {
  return (
    <button
      className={`
        py-3 px-5 rounded text-sm transition
        ${themes[theme].container}
        ${utilClasses}
      `}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon &&
        <span className={themes[theme].icon}>
          <i className={`bi bi-${icon}`}></i>
        </span>
      }
      {text &&
        <span className={themes[theme].text}>
          {text}
        </span>
      }
    </button>
  )
}