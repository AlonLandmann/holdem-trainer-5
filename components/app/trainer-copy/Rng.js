import css from '@/styles/trainer/Rng.module.scss'

export default function Rng({ rn }) {
  return (
    <div className={css.container}>
      <div
        className={css.bar}
        style={{ width: `${rn}%` }}
      />
      <div className={css.number}>
        {rn.toFixed(1)}
      </div>
    </div>
  )
}