import Button from '@/components/_common_/Button'
import { useState } from 'react'

export default function SidebarFolder({ folder }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <div className='flex gap-1'>
        <Button
          theme='tertiary'
          icon={expanded ? 'chevron-down' : 'chevron-right' }
          onClick={() => { setExpanded(prev => !prev )}}
        />
        <h3>
          {folder.name}
        </h3>
      </div>
      {expanded &&
        <div>
          {folder.ranges.map(range => (
            <div key={'range' + range.id}>
              {range.name}
            </div>
          ))}
        </div>
      }
    </div>
  )
}