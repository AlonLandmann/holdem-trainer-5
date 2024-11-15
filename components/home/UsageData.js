import UsageDataItem from './UsageDataItem'

export default function UsageData({ usageInfo }) {
  return (
    <section className='flex flex-col items-center md:flex-row justify-center py-20 xl:py-32 px-12 xl:px-20 gap-24 md:gap-36 xl:gap-52 border-t bg-neutral-800 bg-opacity-10 border-b'>
      <UsageDataItem
        icon='people'
        number={usageInfo.nrUsers}
        text='Users registered'
      />
      <UsageDataItem
        icon='ui-checks'
        number={usageInfo.nrRanges}
        text='Ranges managed'
      />
      <UsageDataItem
        icon='crosshair'
        number={usageInfo.nrCombos}
        text='Hands trained'
      />
    </section>
  )
}