import toast from 'react-hot-toast'
import Button from '../_ui/Button'

export default function StartToolbar({ setPage, selected, nrCombos, setNrCombos }) {
  function handleStart() {
    if (selected.length) {
      setPage('session')
    } else {
      toast('Please select at least one range to train.')
    }
  }

  return (
    <div className='border-b h-[49px] flex items-center px-3'>
      <h1 className='hidden xs:inline-block text-neutral-500 mr-auto'>
        Trainer
      </h1>
      <span className='hidden sm:inline-block text-sm text-neutral-500 ml-4 mr-4 truncate'>
        {selected.length ? selected.length : 'no'} ranges selected
      </span>
      <select
        name='nrCombos'
        className='appearance-none py-2 px-3 mr-1'
        value={String(nrCombos)}
        onChange={e => { setNrCombos(Number(e.target.value)) }}
      >
        <option value='20'>20 Combos</option>
        <option value='50'>50 Combos</option>
        <option value='100'>100 Combos</option>
      </select>
      <Button
        theme='nice'
        utilClasses='h-[39px] px-3 gap-1 rounded-sm'
        icon='crosshair'
        text='Start Training'
        onClick={handleStart}
      />
    </div>
  )
}