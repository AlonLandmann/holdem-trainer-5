import RangeDisplayCard from '@/components/article/RangeDisplayCard'

// 418 + 418 + 40 = 916
// 916 - 640 = 276
// 276 / 2 = 138

export default function RangeDisplayGroup({ rangeIds }) {
  return (
    <div className='flex flex-wrap justify-center items-center gap-10 py-5'>
      {rangeIds.map(rangeId => (
        <RangeDisplayCard
          key={rangeId}
          rangeId={Number(rangeId)}
        />
      ))}
    </div>
  )
}