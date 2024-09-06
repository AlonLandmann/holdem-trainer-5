import css from '@/styles/trainer/TableBoard.module.scss'
import Card from './Card'

export default function TableBoard({ spot, tableWidth }) {
  return !spot.board.length ? null : (
    <>
      <div className={css.container}>
        {spot.board.map((card, i) => (
          <Card
            key={i}
            card={card}
            tableWidth={tableWidth}
          />
        ))}

        <div
          className={css.pot}
          style={{ fontSize: `${Math.max(10, 15 * Math.sqrt(tableWidth / 710))}px` }}
        >
          <i className='bi bi-database'></i>
          <span>{spot.pot - spot.committedAtRound.reduce((a, c) => (a + c), 0)}</span>
        </div>
      </div>
    </>
  )
}