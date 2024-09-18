import Card from "./Card";

export default function Stats({ stats }) {
  function handleLinkToRange(rangeId) {
    window.open(`/ranges/${rangeId}`, '_blank').focus()
  }

  return (
    <div className='sticky top-[57px] z-10 min-w-72 p-5'>
      <div className='height-[30px] mb-[5px] px-1 py-[6px] flex justify-center items-center gap-[5px] text-neutral-600 truncate'>
        <i className='bi bi-bar-chart-line-fill'></i>
        <div> {stats.length} Trained</div>
        <div>·</div>
        <i className='bi bi-crosshair'></i>
        <div>
          {stats.length > 0
            ? `${(100 * stats.reduce((p, c) => (p + Number(c.correct)), 0) / stats.length).toFixed(1)} % Acc.`
            : '0 % Acc.'
          }
        </div>
      </div>
      <div
        className='flex flex-col gap-1 no-scrollbar overflow-y-auto'
        style={{ maxHeight: 'calc(100vh - 132px)' }}
      >
        {stats.toReversed().map((stat, i) => (
          <div
            key={'stat' + i}
            className={`
              border rounded-[3px] p-[5px] flex items-center gap-3 bg-[#202020]
              cursor-pointer transition hover:bg-[#242424]
            `}
            onClick={() => { handleLinkToRange(stat.rangeId) }}
          >
            <div className={`flex gap-[2px] ${stat.correct ? 'grayscale' : ''}`}>
              <Card card={stat.holeCards.slice(0, 2)} small />
              <Card card={stat.holeCards.slice(2, 4)} small />
            </div>
            <div className='grow text-sm text-neutral-400'>
              {stat.rangeName}
            </div>
            <div className='px-[7px] text-neutral-600'>
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