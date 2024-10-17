import Button from '@/components/_ui/Button'

export default function SettingsToolbar() {
  return (
    <div className='border-b h-[49px] flex items-center px-3'>
      <h1 className='text-neutral-500 mr-auto'>
        Settings
      </h1>
      <Button
        theme='nice'
        utilClasses='h-[39px] px-3 gap-1 rounded-sm'
        icon='floppy'
        text='Save Changes'
      />
    </div>
  )
}