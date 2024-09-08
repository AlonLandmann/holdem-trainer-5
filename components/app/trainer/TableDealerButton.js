export default function TableDealerButton({ heroPosition }) {
  const layout = [
    { left: '37%', bottom: '3%' },
    { left: '5%', bottom: '26%' },
    { left: '18%', top: '5%' },
    { left: '37%', top: '3%' },
    { right: '5%', top: '26%' },
    { right: '18%', bottom: '5%' }
  ]

  return (
    <div
      className={`
        absolute h-[30px] w-[30px] border rounded-full flex justify-center
        items-center text-xs text-neutral-400 bg-[#181818] select-none
      `}
      style={layout[(5 - heroPosition) % 6]}
    >
      D
    </div>
  )
}