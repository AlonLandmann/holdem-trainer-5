import Button from '@/components/_common_/Button'
import { useState } from 'react'

export default function SidebarFolder({ folder, selected, setSelected }) {
  const [expanded, setExpanded] = useState(true)

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
      <Button
        theme='tertiary'
        utilClasses='text-neutral-600 hover:text-neutral-500 mb-1'
        text={folder.name}
        onClick={() => { setExpanded(prev => !prev) }}
      />
      {expanded &&
        <div className='flex flex-col gap-[2px]'>
          {folder.ranges.map(range => (
            <Button
              key={'range' + range.id}
              theme='tertiary'
              utilClasses={selected.includes(range.id) ? '' : 'text-neutral-600'}
              icon={selected.includes(range.id) ? 'check2' : 'dot'}
              text={range.name}
              onClick={() => { handleToggle(range.id) }}
            />
          ))}
        </div>
      }
    </div>
  )
}