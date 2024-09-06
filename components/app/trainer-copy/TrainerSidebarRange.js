import css from '@/styles/trainer/TrainerSidebarRange.module.scss'

export default function TrainerSidebarRange({ range, selected, setSelected }) {
  function handleToggleSelect() {
    setSelected(prev => {
      if (prev.includes(range.id)) {
        return prev.filter(rId => rId !== range.id)
      } else {
        return prev.concat([range.id])
      }
    })
  }

  return (
    <div
      className={css[selected.includes(range.id) ? 'containerSelected' : 'container']}
      onClick={handleToggleSelect}
    >
      <div className={css.checkbox}>
        {selected.includes(range.id) &&
          <i className='bi bi-check2'></i>
        }
      </div>
      <div className={css.name}>
        {range.name}
      </div>
    </div>
  )
}