export default function A({
  utilClasses,
  icon,
  text,
  href = '/',
}) {
  return (
    <a
      className='block text-neutral-300 hover:text-neutral-400'
      href={href}
    >
      <div className={`flex items-center gap-2 ${utilClasses}`}>
        {icon &&
          <span>
            <i className={`bi bi-${icon}`}></i>
          </span>
        }
        {text &&
          <span>
            {text}
          </span>
        }
      </div>
    </a>
  )
}