export default function TableChips({ spot, seat, heroPosition }) {
  const p = (seat - heroPosition + 6) % 6

  const layout = [
    { left: '50%', transform: 'translateX(-50%)', bottom: '3%' },
    { left: '10%', bottom: '14%' },
    { left: '10%', top: '14%' },
    { left: '50%', transform: 'translateX(-50%)', top: '3%' },
    { right: '10%', top: '14%' },
    { right: '10%', bottom: '14%' }
  ]

  return spot.committedAtRound[seat] === 0 ? null : (
    <div
      className='absolute h-[30px] w-[30px] flex justify-center items-center gap-2 text-neutral-500 text-sm'
      style={layout[p]}
    >
      <i className='bi bi-database'></i>
      <div>{spot.committedAtRound[seat]}</div>
    </div>
  )
}