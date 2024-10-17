import { capitalize } from 'lodash'
import SettingsToolbar from './SettingsToolbar'
import Button from '../_ui/Button'
import SettingsGroup from './SettingsGroup'
import Setting from './Setting'

export default function SettingsMain({ user }) {
  const currentValueStyle = 'w-32'
  const buttons = 'flex gap-2'

  return (
    <div className='grow'>
      <SettingsToolbar />
      <div className='p-5'>
        <SettingsGroup title='Account'>
          <Setting label='Email' condition={!user.googleId}>
            <div className={currentValueStyle}>
              {user.email}
            </div>
            {user.isVerified &&
              <div>
                <i className='bi bi-check2'></i>
                <span> verified</span>
              </div>
            }
            <div className={buttons}>
              {!user.isVerified &&
                <Button
                  theme='secondary'
                  utilClasses='py-3 px-4'
                  text='verifiy'
                />
              }
              <Button
                theme='secondary'
                utilClasses='py-3 px-4'
                text='change'
              />
            </div>
          </Setting>
          <Setting label='Username'>
            <div className={currentValueStyle}>
              {user.username}
            </div>
            <div className={buttons}>
              <Button
                theme='secondary'
                utilClasses='py-3 px-4'
                text='change'
              />
            </div>
          </Setting>
          <Setting label='Password' condition={!user.googleId}>
            <div className={currentValueStyle}></div>
            <div className={buttons}>
              <Button
                theme='secondary'
                utilClasses='py-3 px-4'
                text='change'
              />
              <Button
                theme='secondary'
                utilClasses='py-3 px-4'
                text='reset'
              />
            </div>
          </Setting>
          <Setting label='Membership'>
            <div className={currentValueStyle}>
              {capitalize(user.membership)}
            </div>
            <div className={buttons}>
              <Button
                theme='secondary'
                utilClasses='py-3 px-4'
                text={user.membership === 'free' ? 'upgrade' : 'change'}
              />
            </div>
          </Setting>
          <Setting label='Account'>
            <div className={currentValueStyle}></div>
            <div className={buttons}>
              <Button
                theme='secondary'
                utilClasses='py-3 px-4'
                text='delete'
              />
            </div>
          </Setting>
        </SettingsGroup>
      </div>
    </div>
  )
}