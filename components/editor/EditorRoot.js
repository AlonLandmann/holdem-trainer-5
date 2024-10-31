import EditorMain from '@/components/editor/EditorMain'
import RangePlaceholder from '@/components/manager/RangePlaceholder'
import { useUser } from '@/hooks/useUser'
import AppLayout from '../_layout/AppLayout'
import EditorHotkeys from './EditorHotkeys'
import { useEffect, useState } from 'react'

export default function EditorRoot() {
  const [user, setUser, isLoading] = useUser()
  
  useEffect(() => {
    if (!isLoading && !user) {
      window.location = '/auth/login'
    }
  }, [isLoading])
  
  useEffect(() => {
    if (user && user.hasRanges) {
      setViewHotkeyInfo(!user.settings.hotkeyInfoDismissed)
    }
  }, [user])
  
  const [viewHotkeyInfo, setViewHotkeyInfo] = useState(null)
  
  return (
    <AppLayout>
      {user && !user.hasRanges &&
        <RangePlaceholder />
      }
      {user && user.hasRanges &&
        <EditorMain
          user={user}
          setViewHotkeyInfo={setViewHotkeyInfo}
        />
      }
      {user && viewHotkeyInfo &&
        <EditorHotkeys
          user={user}
          setUser={setUser}
          setViewHotkeyInfo={setViewHotkeyInfo}
        />
      }
    </AppLayout>
  )
}