import Button from '@/components/_common_/Button'

export default function Toolbar({ range }) {
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
      />
    </div>
  )
}