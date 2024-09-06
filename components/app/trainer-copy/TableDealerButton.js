import css from '@/styles/trainer/TableDealerButton.module.scss'

export default function TableDealerButton({ seat, tableWidth }) {
  return (
    <div
      className={css[`container${seat}`]}
      style={{
        height: `${30 * Math.pow(tableWidth / 710, 0.75)}px`,
        width: `${30 * Math.pow(tableWidth / 710, 0.75)}px`,
        fontSize: `${Math.max(10, 14 * Math.pow(tableWidth / 710, 0.75))}px`
      }}
    >
      D
    </div>
  )
}