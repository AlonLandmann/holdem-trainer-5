import { rank } from '@/lib/client/stats'
import RankBanner from './RankBanner'

export default function TopLine({ user }) {
  return (
    <div className='px-2 flex gap-6 mb-6 items-baseline'>
      <h1 className='text-xl'>
        Oogway
      </h1>
      <RankBanner
        rank={rank(user)}
      />
    </div>
  )
}