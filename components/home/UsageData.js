import UsageDataItem from './UsageDataItem'

export default function UsageData({ usageInfo }) {
  const V2_USERS = 406
  const V2_RANGES_MANAGED = 9299
  const V2_COMBOS_TRAINED = 91478

  return (
    <section className='flex justify-center py-32 px-20 gap-52 border-t bg-neutral-800 bg-opacity-10 border-b'>
      <UsageDataItem
        icon='people'
        number={V2_USERS + usageInfo.nrUsers}
        text='Users registered'
      />
      <UsageDataItem
        icon='ui-checks'
        number={V2_RANGES_MANAGED + usageInfo.nrRanges}
        text='Ranges managed'
      />
      <UsageDataItem
        icon='crosshair'
        number={V2_COMBOS_TRAINED + usageInfo.nrCombos}
        text='Hands trained'
      />
    </section>
  )
}