import { capitalize } from 'lodash'
import SettingsToolbar from './SettingsToolbar'
import Button from '../_ui/Button'
import SettingsGroup from './SettingsGroup'
import Setting from './Setting'
import { useState } from 'react'
import { produce } from 'immer'
import Input from '../_ui/Input'

export default function SettingsMain({ user, setUser }) {
  const [username, setUsername] = useState(user.username)
  const [settings, setSettings] = useState(user.settings)

  function handleChangeUsername(event) {
    setUsername(event.target.value)
  }

  function handleChangeSettings(event, modifier) {
    setSettings(produce(draft => {
      draft[event.target.name] = modifier(event.target.value)
    }))
  }

  return (
    <div className='grow'>
      <SettingsToolbar
        user={user}
        setUser={setUser}
        username={username}
        settings={settings}
      />
      <div className='p-5 flex flex-col gap-5'>
        <SettingsGroup title='Account'>
          <Setting label='Email' condition={!user.googleId}>
            <div>
              {user.email}
            </div>
            {user.isVerified &&
              <div>
                <i className='bi bi-check2'></i>
                <span> verified</span>
              </div>
            }
            <div className='flex gap-2'>
              {!user.isVerified &&
                <Button
                  theme='link'
                  text='verifiy'
                />
              }
              <Button
                theme='link'
                text='change'
              />
            </div>
          </Setting>
          <Setting label='Username'>
            <Input
              utilClasses='py-[10px] px-[15px]'
              style={{ lineHeight: '20px' }}
              value={username}
              onChange={handleChangeUsername}
            />
          </Setting>
          <Setting label='Password' condition={!user.googleId}>
            <Button
              theme='link'
              utilClasses='underline'
              text='reset'
              onClick={() => { window.open('/auth/reset', '_blank') }}
            />
          </Setting>
          <Setting label='Membership'>
            <div>
              {user.membership}
            </div>
            <Button
              theme='link'
              utilClasses='underline'
              text={user.membership === 'HT-Basic' ? 'upgrade' : 'change'}
              onClick={() => { window.open('/pricing', '_blank') }}
            />
          </Setting>
          <Setting label='Account'>
            <div className='text-neutral-500'>
              To delete your account email info@holdem-trainer.com directly.
            </div>
          </Setting>
        </SettingsGroup>
        <SettingsGroup title='App'>
          <Setting label='On brush application'>
            <select
              name='deselectAfterBrush'
              className='appearance-none'
              value={settings.deselectAfterBrush ? 'true' : ''}
              onChange={e => { handleChangeSettings(e, value => Boolean(value)) }}
            >
              <option value='true'>Deselect all combos</option>
              <option value=''>Keep selection</option>
            </select>
          </Setting>
          <Setting label='On range edits'>
            <select
              name='afterPredecessorEdit'
              className='appearance-none'
              value={settings.afterPredecessorEdit}
              onChange={e => { handleChangeSettings(e, value => value) }}
            >
              <option value='never'>Never open linked ranges</option>
              <option value='ask'>Ask to open linked ranges</option>
              <option value='always'>Always open linked ranges</option>
            </select>
          </Setting>
          <Setting label='Session length'>
            <select
              name='defaultSessionLength'
              className='appearance-none'
              value={String(settings.defaultSessionLength)}
              onChange={e => { handleChangeSettings(e, value => Number(value)) }}
            >
              <option value='20'>20 Combos</option>
              <option value='50'>50 Combos</option>
              <option value='100'>100 Combos</option>
            </select>
          </Setting>
        </SettingsGroup>
      </div>
    </div>
  )
}