import Link from 'next/link'

export default function A({
  href = '/',
  icon,
  text,
  utilClasses,
}) {
  return (
    <Link
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
    </Link>
  )
}