export default function SidebarFolder({
  folder,
  isSelected,
  setSelectedFolder
}) {
  return (
    <div
      className={`
        p-3 pr-4 border-b text-neutral-500 text-sm overflow-ellipsis
        flex justify-between gap-3 transition-colors cursor-pointer
        ${isSelected ? 'bg-neutral-800' : 'hover:text-neutral-300'}
      `}
      onClick={() => setSelectedFolder(folder)}
    >
      <span className={`${isSelected ? 'text-neutral-200' : ''}`}>
        {folder.name}
      </span>
      <span className='font-mono'>
        {folder.ranges.length}
      </span>
    </div>
  )
}