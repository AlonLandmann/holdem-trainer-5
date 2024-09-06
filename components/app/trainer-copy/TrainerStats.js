import css from '@/styles/trainer/TrainerStats.module.scss'
import Card from './Card'

export default function TrainerStats({ stats, statFilter, overlay }) {
  const displayedStats = statFilter ? stats.filter(s => !s.correct) : stats

  function handleLinkToRange(stat) {
    window.open(`/ranges/${stat.range.id}`, '_blank').focus()
  }

  return (
    <div
      className={css.container}
      style={{
        position: overlay ? 'fixed' : 'sticky',
        top: overlay ? '55px' : '60px',
        right: overlay ? '15px' : '0',
        minWidth: overlay ? '290px' : '280px',
        maxHeight: overlay ? 'calc(100vh - 50px)' : 'calc(100vh - 80px)',
        padding: overlay ? '5px' : '0',
        borderRadius: overlay ? '3px' : '0'
      }}
    >
      <div className={css.topLine}>
        <i className='bi bi-bar-chart-line-fill'></i>
        <div>
          {stats.length} Trained
        </div>
        <div>·</div>
        <i className='bi bi-crosshair'></i>
        <div className={css.accuracy}>
          {stats.length > 0
            ? `${(100 * stats.reduce((p, c) => (p + Number(c.correct)), 0) / stats.length).toFixed(1)} % Acc.`
            : '0 % Acc.'
          }
        </div>
      </div>
      <div
        className={css.stats}
        style={{ maxHeight: overlay ? 'calc(100vh - 100px)' : 'calc(100vh - 115px)' }}
      >
        {displayedStats.toReversed().map((stat, i) => (
          <div
            key={'stat' + i}
            className={css[stat.correct ? 'stat' : 'statIncorrect']}
            onClick={() => { handleLinkToRange(stat) }}
          >
            <div className={css.combo}>
              <Card card={stat.holeCards.slice(0, 2)} small />
              <Card card={stat.holeCards.slice(2, 4)} small />
            </div>
            <div className={css.range}>
              {stat.range.name}
            </div>
            <div className={css.incorrect}>
              {stat.correct
                ? <i className='bi bi-check2'></i>
                : <i className='bi bi-x-square-fill'></i>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
