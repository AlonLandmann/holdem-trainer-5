import Button from '@/components/_common_/Button'
import Input from '@/components/_common_/Input'
import { useUser } from '@/hooks/useUser'
import handleManagerRequest from '@/lib/client/managerRequests'
import { useEffect, useState } from 'react'

export default function RangeBanner({ range }) {
  const [user, setUser] = useUser()
  const [renameInView, setRenameInView] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState(range.name)

  useEffect(() => {
    setRenaming(false)
    setRenameValue(range.name)
  }, [range])

  async function handleRename() {
    await handleManagerRequest(`/api/ranges/rename?rangeId=${range.id}`, 'PATCH', setUser, {
      name: renameValue
    })
  }

  async function handleDelete() {
    if (confirm(`Are you sure you want to delete the range '${range.name}'? This action cannot be undone.`)) {
      await handleManagerRequest(`/api/ranges/delete?rangeId=${range.id}`, 'DELETE', setUser)
    }
  }

  async function handleDuplicate() {
    await handleManagerRequest('/api/ranges/duplicate', 'POST', setUser, range)
  }

  return (
    <div className='flex p-4 gap-6 rounded bg-neutral-900 max-w-[1000px]'>
      <div className='min-w-36 h-36 bg-neutral-800 rounded mr-4'></div>
      <div className='grow grid grid-cols-1 lg:grid-cols-2 gap-2'>
        <div className='flex flex-col'>
          <div
            className='flex items-center gap-3'
            onMouseEnter={() => setRenameInView(true)}
            onMouseLeave={() => setRenameInView(false)}
          >
            {!renaming &&
              <>
                <h1 className='text-lg'>
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
                  utilClasses='text-lg'
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
          <div className='text-neutral-600 mb-auto'>
            {range.history.map((action, i) => (
              <div key={'action' + i}>
                {action.cards
                  ? <div>{action.cards.join(' ')}</div>
                  : action.size
                    ? action.size
                    : action.type[0].toUpperCase()}
              </div>
            ))}
            <div>
              -
            </div>
          </div>
          <div className='text-neutral-600'>
            {JSON.stringify(range.options)}
          </div>
        </div>
        <div className='hidden lg:flex text-7xl text-neutral-800 justify-center items-center'>
          <i className='bi bi-graph-up-arrow'></i>
        </div>
      </div>
      <div className='flex flex-col gap-1 pr-1 text-sm'>
        <Button
          theme='tertiary'
          icon='trash3'
          onClick={handleDelete}
          useQueue
        />
        <Button
          theme='tertiary'
          icon='pen'
          onClick={() => { window.open(`/app/editor/${range.id}`, '_blank') }}
        />
        <Button
          theme='tertiary'
          icon='copy'
          onClick={handleDuplicate}
          useQueue
        />
        <Button
          theme='tertiary'
          utilClasses='mt-auto text-xs'
          icon='square'
        />
        <Button
          theme='tertiary'
          icon='crosshair'
          onClick={() => { window.open(`/app/trainer?ids=${JSON.stringify([range.id])}`, '_blank') }}
        />
      </div>
    </div>
  )
}