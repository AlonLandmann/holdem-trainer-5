import css from '@/styles/trainer/TrainerSidebarFolder.module.scss'
import Button from '../_common_/Button'
import { useState } from 'react'
import TrainerSidebarRange from './TrainerSidebarRange'

export default function TrainerSidebarFolder({ folder, selected, setSelected }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={css.container}>
      <div className={css.banner}>
        <Button
          theme='borderless'
          icon={expanded ? 'chevron-down' : 'chevron-right'}
          onClick={() => { setExpanded(prev => !prev) }}
        />
        <div className={css.name}>
          {folder.name}
        </div>
        <div className={css.nrRanges}>
          # {folder.ranges.length}
        </div>
      </div>
      {expanded && folder.ranges.map(range => (
        <TrainerSidebarRange
          key={'range' + range.id}
          range={range}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </div>
  )
}
