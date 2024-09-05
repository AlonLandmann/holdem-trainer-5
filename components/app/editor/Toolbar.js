import Button from '@/components/_common_/Button'
import { useUser } from '@/hooks/useUser'
import handleManagerRequest from '@/lib/client/managerRequests'

export default function Toolbar({ range }) {
  const [user, setUser] = useUser()

  async function handleSaveChanges() {
    await handleManagerRequest('/api/ranges/edit', 'PUT', setUser, range)
  }

  return (
    <div className='border-b p-3 flex gap-4'>
      <h1 className='text-neutral-500 mr-auto'>
        {range.name}
      </h1>
      <Button
        theme='tertiary'
        utilClasses='text-neutral-500 hover:text-neutral-300'
        icon='arrow-counterclockwise'
      />
      <Button
        theme='tertiary'
        utilClasses='text-neutral-500 hover:text-neutral-300'
        icon='arrow-clockwise'
      />
      <Button
        theme='tertiary'
        utilClasses='text-neutral-500 hover:text-neutral-300'
        icon='floppy2-fill'
        onClick={handleSaveChanges}
        useQueue
      />
    </div>
  )
}