import Sidebar from './Sidebar'

export default function ManagerMain({ user }) {
  return (
    <>
      <Sidebar user={user} />
      <div className='grow bg-neutral-900'></div>
    </>
  )
}