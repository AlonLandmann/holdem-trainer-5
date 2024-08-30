export default function SidebarFolder({ folder }) {
  return (
    <div
      className={`
        p-3 pr-4 border-b text-neutral-500 text-sm overflow-ellipsis
        flex justify-between gap-3
      `}
    >
      <span>
        {folder.name}
      </span>
      <span>
        {folder.ranges.length}
      </span>
    </div>
  )
}