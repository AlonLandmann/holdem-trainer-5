import RangePlaceholder from '../manager/RangePlaceholder'
import SideNav from '@/components/_layout/SideNav'
import { useUser } from '@/hooks/useUser'
import EditorMain from './EditorMain'

export default function EditorRoot() {
  const [user, setUser] = useUser()

  return (
    <div className='flex h-screen'>
      <SideNav />
      {user && !user.hasRanges &&
        <RangePlaceholder />
      }
      {user && user.hasRanges &&
        <EditorMain user={user} />
      }
    </div>
  )
}