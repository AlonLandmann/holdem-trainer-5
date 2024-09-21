import Button from '@/components/_common_/Button'
import { useState } from 'react'

export default function SidebarFolder({ folder, selected, setSelected }) {
  const [expanded, setExpanded] = useState(false)

  function handleToggle(rangeId) {
    setSelected(prev => {
      if (prev.includes(rangeId)) {
        return prev.filter(rId => rId !== rangeId)
      } else {
        return prev.concat([rangeId])
      }
    })
  }

  return (
    <div>
      <div className='flex gap-1'>
        <Button
          theme='tertiary'
          icon={expanded ? 'chevron-down' : 'chevron-right'}
          onClick={() => { setExpanded(prev => !prev) }}
        />
        <h3>
          {folder.name}
        </h3>
      </div>
      {expanded &&
        <div>
          {folder.ranges.map(range => (
            <div key={'range' + range.id} className='flex gap-1'>
              <Button
                theme='tertiary'
                icon={selected.includes(range.id) ? 'check-square' : 'square'}
                onClick={() => { handleToggle(range.id) }}
              />
              <h3>
                {range.name}
              </h3>
            </div>
          ))}
        </div>
      }
    </div>
  )
}