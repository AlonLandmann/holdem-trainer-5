import EditorMain from '@/components/editor/EditorMain'
import RangePlaceholder from '@/components/manager/RangePlaceholder'
import { useUser } from '@/hooks/useUser'
import AppLayout from '../_layout/AppLayout'
import EditorHotkeys from './EditorHotkeys'
import { useState } from 'react'

export default function EditorRoot() {
  const [user, setUser] = useUser()
  const [viewHotkeyInfo, setViewHotkeyInfo] = useState(user && user.hasRanges && !user.settings.hotkeyInfoDismissed)

  return (
    <AppLayout>
      {user && !user.hasRanges &&
        <RangePlaceholder />
      }
      {user && user.hasRanges &&
        <EditorMain user={user} />
      }
      {viewHotkeyInfo &&
        <EditorHotkeys
          setUser={setUser}
          setViewHotkeyInfo={setViewHotkeyInfo}
        />
      }
    </AppLayout>
  )
}