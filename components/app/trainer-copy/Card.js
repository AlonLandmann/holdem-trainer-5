import { suitIcon } from '@/lib/cards'
import css from '@/styles/trainer/Card.module.scss'

export default function Card({ card, small = false, tableWidth = null }) {
  return (
    <div
      className={`${card ? css[card[1]] : css.back} ${small ? css.small : ''}`}
      style={!tableWidth ? {} : {
        height: `${50 * Math.sqrt(tableWidth / 710)}px`,
        width: `${33 * Math.sqrt(tableWidth / 710)}px`,
        fontSize: `${Math.max(10, 20 * Math.sqrt(tableWidth / 710))}px`
      }}
    >
      {card ? card[0] : ''}
      {card &&
        <div
          className={css.icon}
          style={!tableWidth ? {} : {
            top: `${15 * Math.sqrt(tableWidth / 710)}px`,
            left: `${5 * Math.sqrt(tableWidth / 710)}px`,
          }}
        >
          <i className={suitIcon(card[1])}></i>
        </div>
      }
    </div>
  )
}
