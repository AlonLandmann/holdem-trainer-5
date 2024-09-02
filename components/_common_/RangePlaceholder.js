import handleManagerRequest from '@/lib/client/managerRequests'
import Button from './Button'

export default function RangePlaceholder() {
  function handleAddRange() {
    handleManagerRequest('/api/ranges/add', 'POST')
  }

  return (
    <div className='grow bg-neutral-900 p-4 flex flex-col justify-center items-center'>
      <div className='text-neutral-700 text-7xl mb-3'>
        <i className='bi bi-inbox-fill'></i>
      </div>
      <h1 className='text-xl font-medium mb-2'>
        No ranges yet
      </h1>
      <p className='text-neutral-500 mb-7'>
        Click on the button to add your first range.
      </p>
      <Button
        theme='secondary'
        icon='plus-lg'
        text='Add Range'
        onClick={handleAddRange}
        useQueue
      />
    </div>
  )
}