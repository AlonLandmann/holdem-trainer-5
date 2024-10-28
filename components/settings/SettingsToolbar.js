import Button from '@/components/_ui/Button'
import handleManagerRequest from '@/lib/managerRequests'
import toast from 'react-hot-toast'

export default function SettingsToolbar({ user, setUser, username, settings }) {
  async function handleSave() {
    await handleManagerRequest('/api/settings/update', 'PATCH', setUser, settings)

    if (username !== user.username) {
      if (username.length < 2 || username.length > 30) {
        toast.error('Usernames should be between 2 and 30 characters long.')
      } else {
        await handleManagerRequest('/api/auth/change-username', 'PATCH', setUser, {
          userId: user.id,
          username
        })
      }
    }
  }

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
        onClick={handleSave}
        useQueue
      />
    </div>
  )
}