import { rank } from '@/lib/client/stats'
import RankBanner from './RankBanner'

export default function TopLine({ user }) {
  return (
    <div className='p-2 mb-8 flex gap-6 items-baseline'>
      <h1 className='text-xl'>
        Oogway
      </h1>
      <RankBanner
        rank={rank(user)}
      />
    </div>
  )
}