import EditorMain from '@/components/editor/EditorMain'
import RangePlaceholder from '@/components/manager/RangePlaceholder'
import { useUser } from '@/hooks/useUser'
import AppLayout from '../_layout/AppLayout'

export default function EditorRoot() {
  const [user, setUser] = useUser()

  return (
    <AppLayout>
      {user && !user.hasRanges &&
        <RangePlaceholder />
      }
      {user && user.hasRanges &&
        <EditorMain user={user} />
      }
    </AppLayout>
  )
}