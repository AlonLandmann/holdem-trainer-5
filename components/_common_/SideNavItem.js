import { useRouter } from 'next/router'
import Button from './Button'

export default function SideNavItem({ icon, extendedView, text, href }) {
  const router = useRouter()

  return (
    <div
      className='px-3 py-2 rounded text-neutral-400 transition hover:bg-neutral-800 hover:text-white cursor-pointer'
      onClick={() => { if (href) router.push(href) }}
    >
      <Button
        theme='tertiary'
        utilClasses='text-inherit'
        icon={icon}
        text={extendedView ? text : null}
      />
    </div>
  )
}