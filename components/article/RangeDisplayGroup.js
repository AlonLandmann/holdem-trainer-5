import RangeDisplayCard from '@/components/article/RangeDisplayCard'

export default function RangeDisplayGroup({ rangeIds }) {
  return (
    <div className='min-w-[1000px] grid grid-cols-2 items-center gap-10'>
      {rangeIds.map(rangeId => (
        <RangeDisplayCard
          key={rangeId}
          rangeId={Number(rangeId)}
        />
      ))}
    </div>
  )
}