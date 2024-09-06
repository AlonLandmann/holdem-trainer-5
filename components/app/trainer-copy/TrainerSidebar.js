import { useUser } from '@/hooks/useUser'
import css from '@/styles/trainer/TrainerSidebar.module.scss'
import TrainerSidebarFolder from './TrainerSidebarFolder'
import Link from 'next/link'

export default function TrainerSidebar({ selected, setSelected, overlay }) {
  const [user] = useUser()
  const total = user && user.folders.reduce((acc, curr) => (acc + curr.ranges.length), 0)

  return !user ? null : (
    <div
      className={css.container}
      style={{
        position: overlay ? 'fixed' : 'sticky',
        top: overlay ? '55px' : '60px',
        left: overlay ? '15px' : '0',
        minWidth: overlay ? '290px' : '280px',
        maxHeight: overlay ? 'calc(100vh - 50px)' : 'calc(100vh - 80px)',
        padding: overlay ? '5px' : '0',
        borderRadius: overlay ? '3px' : '0'
      }}
    >
      <div className={css.folders}>
        {user.folders.map(folder => (
          <TrainerSidebarFolder
            key={'folder' + folder.index}
            folder={folder}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
      {!overlay && user.membership == 'free' &&
        <div className={css.total}>
          # {total} / 20 ranges - <Link href='/premium'>upgrade</Link>
        </div>
      }
      {!overlay && user.membership != 'free' &&
        <div className={css.total}>
          # {total} ranges
        </div>
      }
    </div>
  )
}
