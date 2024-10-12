import Checkbox from '../_ui/Checkbox'

export default function StartMain({ user, selected, setSelected }) {
  function handleToggle(rangeId) {
    setSelected(prev => {
      if (prev.includes(rangeId)) {
        return prev.filter(rId => rId !== rangeId)
      } else {
        return prev.concat([rangeId])
      }
    })
  }

  return (
    <div className='p-3'>
      <h1>
        Select ranges to train
      </h1>
      <div className='grid grid-cols-4 gap-x-5 gap-y-8'>
        {user.folders.map(folder => (
          <div key={'folder' + folder.id}>
            <h3>
              {folder.name}
            </h3>
            <div className='flex flex-col gap-1'>
              {folder.ranges.map(range => (
                <div key={'range' + range.id} className='flex items-center gap-2'>
                  <Checkbox
                    isSelected={selected.includes(range.id)}
                    onClick={() => { handleToggle(range.id) }}
                  />
                  <div>{range.name}</div>
                  <div>{range.complexity.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}