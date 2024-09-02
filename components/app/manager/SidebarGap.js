export default function SidebarGap({ index, target }) {
  return (
    <div
      className={target === index ? 'h-3 border-b' : ''}
    >
      
    </div>
  )
}