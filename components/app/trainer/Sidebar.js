import SidebarFolder from "./SidebarFolder";

export default function Sidebar({ user }) {
  return (
    <div
      className='min-w-72 p-5 overflow-y-auto no-scrollbar'
      style={{ maxHeight: 'calc(100vh - 92px)' }}
    >
      {user.folders.map(folder => (
        <SidebarFolder
          key={'folder' + folder.id}
          folder={folder}
        />
      ))}
    </div>
  )
}