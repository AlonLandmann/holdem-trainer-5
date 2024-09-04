import RangePlaceholder from '@/components/_common_/RangePlaceholder'
import SideNav from '@/components/_common_/SideNav'
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