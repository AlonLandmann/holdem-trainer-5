import Button from '@/components/_ui/Button'
import Input from '@/components/_ui/Input'
import { optionColor } from '@/lib/colors'
import { optionPercentage } from '@/lib/percentages'
import { isEqual } from 'lodash'
import { useEffect, useMemo, useState } from 'react'

export default function BrushOption({
  range,
  option,
  enabled,
  display,
  frequency,
  handleChange,
  handleClick,
  setAnyErrors,
  setOptionHover,
  nrOptionsTotal
}) {
  const [value, setValue] = useState(frequency)
  const [error, setError] = useState(false)

  const percentage = useMemo(() => {
    return optionPercentage(range, option)
  }, [range, option])

  useEffect(() => {
    if (frequency !== '0' || (value && Number(value) > 0 && Number(value) <= 100)) {
      setValue(frequency)
      setError(false)
      setAnyErrors(false)
    }
  }, [frequency])

  function handleLocalChange(event) {
    const v = event.target.value
    setValue(v)
    const isValid = v && Number(v) <= 100 && (Number(v) > 0 || v === '0')
    const isNotTooAccurate = v.split('.').length <= 1 || v.split('.')[1].length <= 1
    setError(!isValid || !isNotTooAccurate)
    setAnyErrors(!isValid || !isNotTooAccurate)
    let freq = isValid ? (isNotTooAccurate ? v : String(Math.floor(10 * Number(v)) / 10)) : '0'
    handleChange({ target: { value: freq } })
  }

  function handleMouseEnter() {
    setOptionHover(range.options.findIndex(o => isEqual(o, option)))
  }

  function handleMouseLeave() {
    setOptionHover(null)
  }

  return (
    <div
      className='grid items-center gap-2'
      style={{ gridTemplateColumns: '15px 110px 90px auto' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='w-[15px] h-[15px] rounded-sm' style={{ background: enabled ? optionColor(option, range.spot) : '#666' }}></div>
      <div className='flex justify-between items-center gap-2 text-nowrap text-clip'>
        <div>
          {display}
        </div>
        <div className='text-neutral-500'>
          {percentage}
        </div>
      </div>
      <Input
        theme='editor'
        type='number'
        utilClasses={error ? 'border-neutral-500 focus:border-neutral-500' : ''}
        min={0}
        max={100}
        step={0.1}
        disabled={!enabled || (nrOptionsTotal === 1)}
        value={value}
        onChange={handleLocalChange}
      />
      <Button
        theme='secondary'
        utilClasses='self-stretch px-3 py-0'
        icon={option.size ? 'trash3' : (enabled ? 'ban' : 'check2')}
        onClick={handleClick}
      />
    </div>
  )
}