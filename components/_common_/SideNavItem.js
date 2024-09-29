import { useRouter } from 'next/router'
import Button from './Button'

export default function SideNavItem({ icon, extendedView, text, href, onClick }) {
  const router = useRouter()
  const currentNav = router.pathname.split('/')[2]
  const targetNav = href && href.split('/')[2]
  const isSelected = currentNav === targetNav

  return (
    <div
      className={`
        px-3 py-2 rounded text-neutral-400
        transition hover:bg-neutral-800
        hover:text-white cursor-pointer
        ${isSelected ? 'bg-neutral-800' : ''}
      `}
      onClick={() => {
        if (href === '/app/dashboard') {
          window.location = `${href}?extended=true`
        } else if (href) {
          router.push(`${href}?extended=true`)
        } else {
          onClick()
        }
      }}
    >
      <Button
        theme='tertiary'
        utilClasses={isSelected ? 'text-white' : ''}
        icon={icon}
        text={extendedView ? text : null}
      />
    </div>
  )
}