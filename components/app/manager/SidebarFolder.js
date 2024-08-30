export default function SidebarFolder({ folder }) {
  return (
    <div
      className={`
        p-3 border-b text-neutral-400 text-sm overflow-ellipsis
        flex gap-3
      `}
    >
      <span>{folder.name}</span>
    </div>
  )
}