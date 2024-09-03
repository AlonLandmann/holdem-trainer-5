import RangePlaceholder from '@/components/_common_/RangePlaceholder'
import SideNav from '@/components/_common_/SideNav'

export default function EditorRoot() {
  return (
    <div className='flex h-screen'>
      <SideNav />
      <RangePlaceholder />
    </div>
  )
}