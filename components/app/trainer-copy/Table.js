import css from '@/styles/trainer/Table.module.scss'
import TableBoard from './TableBoard'
import TableSeat from './TableSeat'
import { positions } from '@/lib/spots'
import TableDealerButton from './TableDealerButton'
import TableChips from './TableChips'

export default function Table({ spot, holeCards, originalP, flash, width }) {
  const height = width * (510 / 710)

  return (
    <div
      className={css.container}
      style={{
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      <div
        className={`${css.outerTable} ${css[flash || 'noFlash']}`}
        style={{
          width: `${0.901 * width}px`,
          height: `${0.686 * height}px`,
          borderRadius: `${0.343 * height}px`
        }}
      >
        <div
          className={css.innerTable}
          style={{
            width: `${0.817 * width}px`,
            height: `${0.569 * height}px`,
            borderRadius: `${0.284 * height}px`
          }}
        >
          <div
            className={css.logo}
            style={{ fontSize: `${0.141 * width}px` }}
          >
            HT
          </div>
          <TableChips
            spot={spot}
            originalP={originalP}
            tableWidth={width}
          />
          <TableDealerButton
            seat={(11 - originalP) % 6}
            tableWidth={width}
          />
        </div>
        <TableBoard
          spot={spot}
          tableWidth={width}
        />
      </div>
      {positions.map((_, i) => (
        <TableSeat
          key={'seat' + i}
          spot={spot}
          seat={i}
          combo={i === 0 ? holeCards : null}
          originalP={originalP}
          tableWidth={width}
        />
      ))}
    </div>
  )
}
