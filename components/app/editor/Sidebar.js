import Brush from './Brush'
import Categories from './Categories'
import History from './History'
import Predecessor from './Predecessor'
import Stacks from './Stacks'

export default function Sidebar({ range, setRange }) {
  return (
    <div className='p-3 overflow-y-auto flex flex-col gap-2'>
      <h1 className='tracking-wider text-sm text-neutral-400'>
        Stacks
      </h1>
      <Stacks
        range={range}
        setRange={setRange}
      />
      <h1 className='tracking-wider text-sm text-neutral-400 pt-2 border-t mt-3'>
        History
      </h1>
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