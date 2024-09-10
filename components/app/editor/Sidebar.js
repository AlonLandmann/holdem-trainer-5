import Brush from './Brush'
import Categories from './Categories'
import History from './History'
import Legend from './Legend'
import Predecessor from './Predecessor'
import Stacks from './Stacks'

export default function Sidebar({
  range,
  setRange,
  selected,
  setSelected,
  setHovered,
  setOptionHover,
  error,
  setError,
}) {
  return (
    <div
      className='overflow-y-auto no-scrollbar'
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
      <Legend
        range={range}
        setSelected={setSelected}
        setHovered={setHovered}
      />
      <Categories
        range={range}
        setSelected={setSelected}
        setHovered={setHovered}
      />
    </div>
  )
}