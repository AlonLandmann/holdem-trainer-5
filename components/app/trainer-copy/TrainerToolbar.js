import css from '@/styles/trainer/TrainerToolbar.module.scss'
import Button from '../_common_/Button'

export default function TrainerToolbar({
  sidebarInView,
  setSidebarInView,
  statsInView,
  setStatsInView,
  statFilter,
  setStatFilter,
  setStats
}) {
  return (
    <div className={css.container}>
      <div className={css.separator} />
      <div className={css.leftMenu}>
        <Button
          theme='border'
          icon={sidebarInView ? 'layout-sidebar-inset' : 'layout-sidebar'}
          tooltip='view ranges'
          onClick={() => { setSidebarInView(prev => !prev) }}
        />
      </div>
      <div className={css.rightMenu}>
      {statsInView &&
          <Button
            theme='border'
            icon={'arrow-counterclockwise'}
            tooltip='reset stats'
            onClick={() => { setStats([]) }}
          />
        }
        {statsInView &&
          <Button
            theme='border'
            icon={statFilter ? 'filter-square-fill' : 'filter-square'}
            tooltip='filter incorrect'
            onClick={() => { setStatFilter(prev => !prev) }}
          />
        }
        <Button
          theme='border'
          icon={statsInView ? 'bar-chart-fill' : 'bar-chart'}
          tooltip='view stats'
          onClick={() => { setStatsInView(prev => !prev) }}
        />
      </div>
      <div className={css.separator} />
    </div>
  )
}