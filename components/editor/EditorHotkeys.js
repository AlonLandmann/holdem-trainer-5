import { useState } from 'react'
import Button from '../_ui/Button'
import handleManagerRequest from '@/lib/managerRequests'

export default function EditorHotkeys({ user, setUser, setViewHotkeyInfo }) {
  const [isMacOS, setIsMacOS] = useState(false)

  function handleDismiss() {
    setViewHotkeyInfo(false)

    if (!user.settings.hotkeyInfoDismissed) {
      handleManagerRequest('/api/settings/update', 'PATCH', setUser, {
        hotkeyInfoDismissed: true
      })
    }
  }

  return (
    <div className='fixed z-50 w-full h-screen bg-[#000000dd] flex justify-center items-center'>
      <div className='bg-neutral-950 rounded border'>
        <div className='flex items-center border-b pt-5 pb-4 px-6'>
          <h1 className='text-neutral-400 font-medium mr-auto'>
            Hotkey Information
          </h1>
          <Button
            theme={isMacOS ? 'secondary' : 'primary'}
            utilClasses='w-8 h-8 rounded-r-none'
            icon='windows'
            onClick={() => { setIsMacOS(false) }}
            disabled={!isMacOS}
          />
          <Button
            theme={isMacOS ? 'primary' : 'secondary'}
            utilClasses='w-8 h-8 rounded-l-none'
            icon='apple'
            onClick={() => { setIsMacOS(true) }}
            disabled={isMacOS}
          />
        </div>
        <div className='py-6 px-7'>
          <p className='max-w-[55ch] mb-6 text-neutral-400'>
            To select and deselected a specific combo, simply click on it.
            To facilitate speedy selections, you can use the following hotkeys while clicking on combos.
          </p>
          <div className='grid gap-1' style={{ gridTemplateColumns: '2fr 5fr' }} >
            <div>-</div>
            <div>select / deselect a single combo</div>
            <div>{isMacOS ? 'Command' : 'Ctrl'} </div>
            <div>select all combos of equal value</div>
            <div>{isMacOS ? 'Command' : 'Ctrl'} + Shift</div>
            <div>deselect all combos of equal value</div>
            <div>{isMacOS ? 'Option' : 'Alt'}</div>
            <div>select all suited combos of equal value</div>
            <div>{isMacOS ? 'Option' : 'Alt'} + Shift</div>
            <div>deselect all suited combos of equal value</div>
          </div>
          <Button
            theme='nice'
            utilClasses='py-3 px-4 mt-10'
            text='OK'
            onClick={handleDismiss}
          />
        </div>
      </div>
    </div>
  )
}