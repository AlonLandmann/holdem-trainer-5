import Button from '@/components/_common_/Button'
import { useUser } from '@/hooks/useUser'
import handleManagerRequest from '@/lib/client/managerRequests'

export default function RangeBanner({ range }) {
  const [user, setUser] = useUser()

  async function handleDelete() {
    if (confirm(`Are you sure you want to delete the range '${range.name}'? This action cannot be undone.`)) {
      await handleManagerRequest(`/api/ranges/delete?rangeId=${range.id}`, 'DELETE', setUser)
    }
  }

  return (
    <div className='flex p-4 gap-6 rounded bg-neutral-900 max-w-[1000px]'>
      <div className='min-w-36 h-36 bg-neutral-800 rounded mr-4'></div>
      <div className='grow grid grid-cols-1 lg:grid-cols-2 gap-2'>
        <div className='flex flex-col'>
          <div className='text-lg mb-1'>
            {range.name}
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
        />
        <Button
          theme='tertiary'
          icon='copy'
        />
        <Button
          theme='tertiary'
          utilClasses='mt-auto text-xs'
          icon='square'
        />
        <Button
          theme='tertiary'
          icon='crosshair'
        />
      </div>
    </div>
  )
}