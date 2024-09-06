import css from '@/styles/trainer/TableSeat.module.scss'
import Card from './Card'
import { positions } from '@/lib/spots'

export default function TableSeat({ spot, seat, combo, originalP, tableWidth }) {
  const p = (originalP + seat) % 6
  
  const h = `${Math.max(0, 45 * Math.pow(tableWidth / 710, 2))}px`
  const v = `${Math.max(0, 60 * Math.pow(tableWidth / 710, 2))}px`
  const v2 = `${Math.max(0, 15 * Math.pow(tableWidth / 710, 3.2))}px`

  const layout = [
    { left: '50%', transform: `translateX(-50%)`, bottom: v2 },
    { left: h, bottom: v },
    { left: h, top: v },
    { left: '50%', transform: `translateX(-50%)`, top: v2 },
    { right: h, top: v },
    { right: h, bottom: v }
  ]

  return (
    <div
      className={css['seat' + seat]}
      style={!tableWidth ? {} : {
        fontSize: `${Math.max(10, 14 * Math.sqrt(tableWidth / 710))}px`,
        ...layout[seat]
      }}
    >
      <div className={css.position}>
        {positions[p]}
      </div>
      <div
        className={css.cards}
        style={{ opacity: spot.hasFolded[p] ? 0.1 : 1 }}
      >
        <Card card={combo ? combo.slice(0, 2) : null} tableWidth={tableWidth} />
        <Card card={combo ? combo.slice(2, 4) : null} tableWidth={tableWidth} />
      </div>
      <div className={css.info}>
        {spot.stacksAtRound[p] - spot.committedAtRound[p]}
        {spot.lastActions[p] &&
          <span> | {spot.lastActions[p]}</span>
        }
      </div>
    </div>
  )
}