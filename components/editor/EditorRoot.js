import SideNav from '@/components/_layout/SideNav'
import EditorMain from '@/components/editor/EditorMain'
import RangePlaceholder from '@/components/manager/RangePlaceholder'
import { useUser } from '@/hooks/useUser'

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