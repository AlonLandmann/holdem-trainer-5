import Button from '@/components/_ui/Button'
import Input from '@/components/_ui/Input'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function RangeName({ range, renaming, setRenaming }) {
  const [renameInView, setRenameInView] = useState(false)
  const [renameValue, setRenameValue] = useState(range.name)

  useEffect(() => {
    setRenaming(false)
    setRenameValue(range.name)
  }, [range])

  async function handleRename() {
    const res = await fetch(`/api/manager/rename-range?rangeId=${range.id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ renameValue: renameValue }),
    });

    const json = await res.json();

    if (json.success) {
      window.location.reload();
    } else {
      toast.error(json.message || "An unexpected error occurred.");
    }
  }

  return (
    <div
        className='flex items-center gap-3 z-40 max-w-[418px]'
        onMouseEnter={() => setRenameInView(true)}
        onMouseLeave={() => setRenameInView(false)}
      >
        {!renaming &&
          <>
            <h1 className='text-lg truncate'>
              {range.name}
            </h1>
            <Button
              theme='tertiary'
              utilClasses={`transition ${renameInView ? 'opacity-100' : 'opacity-0'}`}
              icon='input-cursor'
              onClick={async () => setRenaming(true)}
              useQueue
            />
          </>
        }
        {renaming &&
          <>
            <Input
              theme='rename'
              utilClasses='text-lg grow'
              value={renameValue}
              onChange={e => setRenameValue(e.target.value)}
            />
            <Button
              theme='tertiary'
              utilClasses='text-sm'
              icon='x-lg'
              onClick={async () => { setRenaming(false); setRenameValue(range.name) }}
              useQueue
            />
            <Button
              theme='tertiary'
              icon='check2'
              onClick={handleRename}
              useQueue
            />
          </>
        }
      </div>
  )
}