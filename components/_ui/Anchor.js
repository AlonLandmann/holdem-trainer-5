import Link from 'next/link'

export default function Anchor({
  utilClasses,
  href,
  text,
}) {
  return (
    <span
      className={`
        text-neutral-300 hover:text-neutral-100
        ${utilClasses}
      `}
    >
      <Link href={href}>
        {text}
      </Link>
    </span>
  )
}