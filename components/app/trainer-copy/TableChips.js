import { positions } from '@/lib/spots'
import css from '@/styles/trainer/TableChips.module.scss'

export default function TableChips({ spot, originalP, tableWidth }) {
  return (
    <>
      {positions.map((_, i) => (spot.committedAtRound[i] > 0 &&
        <div
          key={'committed' + i}
          className={css[`committed${(6 + i - originalP) % 6}`]}
          style={{ fontSize: `${Math.max(10, 15 * Math.sqrt(tableWidth / 710))}px` }}
        >
          <i className='bi bi-database'></i>
          <span>{spot.committedAtRound[i]}</span>
        </div>
      ))}
    </>
  )
}
