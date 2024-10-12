export default function Checkbox({ isSelected, onClick, utilClasses }) {
  return (
    <div
      onClick={onClick}
      className={`
        border-2 rounded-sm w-6 h-6 p-1
        flex justify-center items-center
        transition hover:border-neutral-700
        ${utilClasses}
      `}
    >
      {isSelected &&
        <i className='bi bi-check2 text-neutral-500'></i>
      }
    </div>
  )
}