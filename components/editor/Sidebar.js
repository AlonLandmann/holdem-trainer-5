import Brush from '@/components/editor/Brush'
import History from '@/components/editor/History'
import Predecessor from '@/components/editor/Predecessor'
import Stacks from '@/components/editor/Stacks'

export default function Sidebar({
  range,
  setRange,
  selected,
  setSelected,
  setOptionHover,
  error,
  setError,
}) {
  return (
    <div
      className='p-3 overflow-y-auto no-scrollbar flex flex-col gap-3'
      style={{ maxHeight: 'calc(100vh - 49px)' }}
    >
      <Stacks
        range={range}
        setRange={setRange}
        setError={setError}
      />
      <History
        range={range}
        setRange={setRange}
        error={error}
      />
      <Predecessor
        range={range}
        setRange={setRange}
      />
      <Brush
        range={range}
        setRange={setRange}
        selected={selected}
        setSelected={setSelected}
        setOptionHover={setOptionHover}
      />
    </div>
  )
}