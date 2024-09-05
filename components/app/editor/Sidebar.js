import Brush from './Brush'
import Categories from './Categories'
import History from './History'
import Predecessor from './Predecessor'
import Stacks from './Stacks'

export default function Sidebar({ range, setRange, selected, setSelected, setHovered }) {
  return (
    <div className='overflow-y-auto'>
      <Stacks
        range={range}
        setRange={setRange}
      />
      <History
        range={range}
        setRange={setRange}
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
      />
      <Categories
        range={range}
        setSelected={setSelected}
        setHovered={setHovered}
      />
    </div>
  )
}