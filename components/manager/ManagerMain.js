import { useEffect, useState } from 'react'
import FolderContent from './FolderContent'
import Sidebar from './Sidebar'

export default function ManagerMain({ user }) {
  const [selectedFolder, setSelectedFolder] = useState(
    user.folders.length ? user.folders[0] : null
  )

  useEffect(() => {
    setSelectedFolder(prev => {
      const sameFolder = user.folders.find(f => f.id === prev.id)

      if (sameFolder) {
        return sameFolder
      } else {
        return user.folders.length ? user.folders[0] : null
      }
    })
  }, [user])

  return !selectedFolder ? null : (
    <div className='bg-neutral-900 grow flex'>
      <Sidebar
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
      />
      <FolderContent
        selectedFolder={selectedFolder}
      />
    </div>
  )
}