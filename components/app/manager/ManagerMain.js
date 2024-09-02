import { useState } from 'react'
import FolderContent from './FolderContent'
import Sidebar from './Sidebar'

export default function ManagerMain({ user }) {
  const [selectedFolder, setSelectedFolder] = useState(
    user.folders.length ? user.folders[0] : null
  )

  return !selectedFolder ? null : (
    <>
      <Sidebar user={user} />
      <FolderContent selectedFolder={selectedFolder} />
    </>
  )
}