import Button from '@/components/_ui/Button'
import { useUser } from '@/hooks/useUser'
import handleManagerRequest from '@/lib/managerRequests'
import toast from 'react-hot-toast'
import Confirm from '../_ui/Confirm'
import { useRouter } from 'next/router'

export default function RangeUiButtons({ range, folderLength }) {
  const router = useRouter()
  const [user, setUser] = useUser()

  function handleDelete() {
    toast.dismiss()

    const toastId = toast.custom(
      <Confirm
        prompt={`Are you sure you want to delete the range '${range.name}'? This action cannot be undone.`}
        onCancel={async () => toast.remove(toastId)}
        onConfirm={async () => {
          await handleManagerRequest(`/api/ranges/delete?rangeId=${range.id}&rangeIndex=${range.index}&folderId=${range.folderId}`, 'DELETE', setUser)
          toast.remove(toastId)
        }}
      />,
      {
        duration: Infinity,
      }
    )
  }

  async function handleDuplicate() {
    const res = await fetch('/api/manager/duplicate-range', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(range),
    });

    const json = await res.json();

    if (json.success) {
      window.location.reload();
    } else {
      toast.error(json.message || 'An unexpected error occurred.');
    }
  }

  async function handleSortUp() {
    const res = await fetch('/api/manager/move-range-within', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ origin: range.index, originId: range.id, target: range.index - 1 }),
    });

    const json = await res.json();

    if (json.success) {
      window.location.reload();
    } else {
      toast.error(json.message || 'An unexpected error occurred.');
    }
  }

  async function handleSortDown() {
    const res = await fetch('/api/manager/move-range-within', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ origin: range.index, originId: range.id, target: range.index + 2 }),
    });

    const json = await res.json();

    if (json.success) {
      window.location.reload();
    } else {
      toast.error(json.message || 'An unexpected error occurred.');
    }
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
        onClick={() => { router.push(`/app/editor/${range.id}`) }}
        useQueue
      />
      <Button
        theme='tertiary'
        icon='trash3'
        onClick={handleDelete}
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