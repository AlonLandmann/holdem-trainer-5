import Button from '@/components/_ui/Button'
import { capitalize } from 'lodash'

export default function SettingsMain({ user }) {
  const rowStyle = 'flex items-center'
  const labelStyle = 'w-36 text-neutral-400'
  const currentValueStyle = 'w-32'
  const buttons = 'flex gap-2'

  return (
    <div className='py-10 px-12'>
      <section>
        <h1 className='mb-5 text-neutral-500 text-lg'>
          Account Settings
        </h1>
        <div className='flex flex-col gap-2'>
          {!user.googleId &&
            <div className={rowStyle}>
              <label className={labelStyle}>
                Email
              </label>
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
            </div>
          }
          <div className={rowStyle}>
            <label className={labelStyle}>
              Username
            </label>
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
          </div>
          {!user.googleId &&
            <div className={rowStyle}>
              <label className={labelStyle}>
                Password
              </label>
              <div className={currentValueStyle}>

              </div>
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
            </div>
          }
          <div className={rowStyle}>
            <label className={labelStyle}>
              Membership
            </label>
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
          </div>
          <div className={rowStyle}>
            <label className={labelStyle}>
              Account
            </label>
            <div className={currentValueStyle}>

            </div>
            <div className={buttons}>
              <Button
                theme='secondary'
                utilClasses='py-3 px-4'
                text='delete'
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}