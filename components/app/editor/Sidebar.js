import Brush from './Brush'
import Categories from './Categories'
import History from './History'
import Predecessor from './Predecessor'
import Stacks from './Stacks'

export default function Sidebar({ range, setRange }) {
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
      />
      <Categories
        range={range}
      />
    </div>
  )
}