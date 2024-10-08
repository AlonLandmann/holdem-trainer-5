import Button from '@/components/_ui/Button'
import { useUser } from '@/hooks/useUser'
import handleManagerRequest from '@/lib/managerRequests'

export default function RangeUiButtons({ range, folderLength }) {
  const [user, setUser] = useUser()

  async function handleDelete() {
    if (confirm(`Are you sure you want to delete the range '${range.name}'? This action cannot be undone.`)) {
      await handleManagerRequest(`/api/ranges/delete?rangeId=${range.id}&rangeIndex=${range.index}&folderId=${range.folderId}`, 'DELETE', setUser)
    }
  }

  async function handleDuplicate() {
    await handleManagerRequest('/api/ranges/duplicate', 'POST', setUser, range)
  }

  async function handleSortUp() {

  }

  async function handleSortDown() {
    
  }

  return (
    <div className='p-1 pr-3 flex flex-col gap-1 text-sm'>
      <Button
        theme='tertiary'
        icon='copy'
        onClick={handleDuplicate}
        useQueue
      />
      <Button
        theme='tertiary'
        icon='pen'
        onClick={() => { window.location = `/app/editor/${range.id}` }}
        useQueue
      />
      <Button
        theme='tertiary'
        icon='trash3'
        onClick={handleDelete}
        useQueue
      />
      <Button
        theme='tertiary'
        utilClasses='mt-auto'
        icon='arrow-up'
        onClick={handleSortUp}
        disabled={range.index === 0}
        useQueue
      />
      <Button
        theme='tertiary'
        icon='arrow-down'
        onClick={handleSortDown}
        disabled={range.index === folderLength - 1}
        useQueue
      />
    </div>
  )
}