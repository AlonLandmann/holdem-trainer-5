import Button from '@/components/_ui/Button'
import StrategyPreview from '@/components/editor/StrategyPreview'
import { strategyColor } from '@/lib/colors'

export default function Category({ range, comboArray, name, fraction, strategy, setSelected, setHovered }) {
  function handleAddToSelected() {
    setSelected(prev => prev.concat(comboArray))
  }

  function handleRemoveFromSelected() {
    setSelected(prev => prev.filter(c => !comboArray.includes(c)))
  }

  function handleSetHovered() {
    setHovered(comboArray)
  }

  function handleClearHovered() {
    setHovered([])
  }

  return (
    <div
      className='flex items-center gap-[3px]'
    >
      <Button
        theme='secondary'
        utilClasses='h-[30px] w-[30px] p-0 flex justify-center items-center'
        icon='dash-lg'
        onClick={handleRemoveFromSelected}
      />
      <Button
        theme='secondary'
        utilClasses='h-[30px] w-[30px] p-0 flex justify-center items-center'
        icon='plus-lg'
        onClick={handleAddToSelected}
      />
      <div className='grow h-[34px] py-[2px] flex items-center gap-[2px]'
        onMouseEnter={handleSetHovered}
        onMouseLeave={handleClearHovered}>
        <div className='min-w-16 sm:min-w-24 pl-[6px] pr-[3px]'>
          {name != '--use-strategy--' ? name :
            <div
              className='w-[15px] h-[15px] rounded-sm'
              style={{ background: strategyColor(range, strategy) }}
            >

            </div>
          }
        </div>
        <div className='min-w-16 sm:min-w-20 ml-auto pl-[3px] pr-[6px] text-right'>
          {(100 * fraction).toFixed(1)} %
        </div>
        <StrategyPreview
          range={range}
          strategy={strategy}
        />
      </div>
    </div>
  )
}
