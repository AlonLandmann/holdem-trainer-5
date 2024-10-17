import { capitalize } from 'lodash'
import SettingsToolbar from './SettingsToolbar'
import Button from '../_ui/Button'
import SettingsGroup from './SettingsGroup'
import Setting from './Setting'

export default function SettingsMain({ user }) {
  return (
    <div className='grow'>
      <SettingsToolbar />
      <div className='p-5 flex flex-col gap-5'>
        <SettingsGroup title='Account'>
          <Setting label='Email' condition={!user.googleId}>
            <div className='w-32'>
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
            <div className='w-32'>
              {user.username}
            </div>
            <Button
              theme='link'
              text='change'
            />
          </Setting>
          <Setting label='Password' condition={!user.googleId}>
            <div className='w-32'></div>
            <div className='flex gap-2'>
              <Button
                theme='link'
                text='change'
              />
              <Button
                theme='link'
                text='reset'
              />
            </div>
          </Setting>
          <Setting label='Membership'>
            <div className='w-32'>
              {capitalize(user.membership)}
            </div>
            <Button
              theme='link'
              text={user.membership === 'free' ? 'upgrade' : 'change'}
            />
          </Setting>
          <Setting label='Account'>
            <div className='w-32'></div>
            <Button
              theme='link'
              text='delete'
            />
          </Setting>
        </SettingsGroup>
        <SettingsGroup title='App'>
          <Setting label='Brush application'>
            
          </Setting>
          <Setting label='Successor ranges'>

          </Setting>
          <Setting label='Session length'>
            
          </Setting>
        </SettingsGroup>
      </div>
    </div>
  )
}