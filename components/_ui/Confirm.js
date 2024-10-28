import Button from './Button'

export default function Confirm({
  prompt,
  onConfirm = async () => {},
  confirmText = 'Confirm',
  onCancel = async () => {},
  cancelText = 'Cancel',
}) {
  return (
    <div className='border bg-neutral-900 rounded px-4 py-3 max-w-[450px] flex flex-col gap-5'>
      <p className='text-neutral-200'>
        {prompt}
      </p>
      <div className='flex gap-2 self-end'>
        <Button
          theme='nice'
          utilClasses='py-3 px-4'
          text={confirmText}
          onClick={onConfirm}
          useQueue
        />
        <Button
          theme='secondary'
          utilClasses='py-3 px-4'
          text={cancelText}
          onClick={onCancel}
          useQueue
        />
      </div>
    </div>
  )
}
