import Button from '@/components/_ui/Button'
import { useRouter } from 'next/router'

export default function SideNavItem({ icon, text, href, onClick, extendedView }) {
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
          window.location = href
        } else if (href) {
          router.push(href)
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