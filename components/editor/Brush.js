import Button from '@/components/_ui/Button'
import Input from '@/components/_ui/Input'
import BrushOption from '@/components/editor/BrushOption'
import BrushSlider from '@/components/editor/BrushSlider'
import { isValid } from '@/lib/cards'
import { evenSplit } from '@/lib/rounding'
import { produce } from 'immer'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Brush({ range, setRange, selected, setSelected, setOptionHover, settings }) {
  const foldEnabled = Boolean(range.options.find(o => o.type === 'fold'))
  const callEnabled = Boolean(range.options.find(o => o.type === 'call'))
  const checkEnabled = Boolean(range.options.find(o => o.type === 'check'))
  const n = range.options.length
  const offset = foldEnabled + callEnabled + checkEnabled
  const [frequencies, setFrequencies] = useState(evenSplit(n))
  const [size, setSize] = useState('')
  const [anyErrors, setAnyErrors] = useState(false)

  useEffect(() => {
    setFrequencies(evenSplit(n))
  }, [n])

  function addOption(index, option) {
    setRange(produce(draft => {
      draft.options.splice(index, 0, option)
      draft.matrix.forEach(c => { c.strategy.splice(index, 0, 0) })
    }))
  }

  function handleFrequencyChange(event, index) {
    setFrequencies(produce(draft => {
      const oldValue = Number(draft[index])
      const newValue = event.target.value ? Number(event.target.value) : 0
      draft[index] = event.target.value

      if (oldValue < newValue) {
        let remaining = newValue - oldValue

        for (let i = index + 1; i < draft.length; i++) {
          const absorbed = Math.min(remaining, Number(draft[i]))
          draft[i] = String(Number(draft[i]) - absorbed)
          remaining -= absorbed
        }

        for (let i = index - 1; i >= 0; i--) {
          const absorbed = Math.min(remaining, Number(draft[i]))
          draft[i] = String(Number(draft[i]) - absorbed)
          remaining -= absorbed
        }
      } else {
        let remaining = oldValue - newValue

        for (let i = index + 1; i < draft.length; i++) {
          const absorbed = Math.min(remaining, 100 - Number(draft[i]))
          draft[i] = String(Number(draft[i]) + absorbed)
          remaining -= absorbed
        }

        for (let i = index - 1; i >= 0; i--) {
          const absorbed = Math.min(remaining, 100 - Number(draft[i]))
          draft[i] = String(Number(draft[i]) + absorbed)
          remaining -= absorbed
        }
      }

      for (let i = 0; i < draft.length; i++) {
        draft[i] = String(Math.round(10 * Number(draft[i])) / 10)
      }
    }))
  }

  function handleRemoveOption(index) {
    if (range.options.length === 1) {
      return toast.error('Cannot remove last option.')
    }

    setRange(produce(draft => {
      draft.options.splice(index, 1)

      for (let i = 0; i < draft.matrix.length; i++) {
        const removed = draft.matrix[i].strategy.splice(index, 1)
        draft.matrix[i].strategy[Math.max(0, index - 1)] += removed[0]
      }
    }))
  }

  function handleToggle(type) {
    if (type === 'fold') {
      if (foldEnabled) {
        handleRemoveOption(0)
      } else {
        addOption(0, { type })
      }
    }

    if (type === 'call') {
      if (callEnabled) {
        handleRemoveOption(foldEnabled ? 1 : 0)
      } else {
        addOption(foldEnabled ? 1 : 0, { type })
      }
    }

    if (type === 'check') {
      if (checkEnabled) {
        handleRemoveOption(0)
      } else {
        addOption(0, { type })
      }
    }
  }

  function handleAddSize() {
    if (!size) {
      return toast.error('Size is not a number.')
    }

    if (range.options.map(o => o.size).includes(Number(size))) {
      return toast.error('Size already exists.')
    }

    if (Number(size) < range.spot.min) {
      return toast.error(`Size must be at least ${range.spot.min} bb.`)
    }

    if (Number(size) > range.spot.max) {
      return toast.error(`Size must be at most ${range.spot.max} bb.`)
    }

    const index = range.options.filter(o => !o.size || o.size < Number(size)).length
    const type = range.spot.state == 'fold / call / raise' ? 'raise' : 'bet'

    addOption(index, { type, size: Number(size) })
    setSize('')
  }

  function handleApplyBrush() {
    setRange(produce(draft => {
      for (let i = 0; i < draft.matrix.length; i++) {
        const { combo, frequency } = draft.matrix[i]

        if (selected.includes(combo) && frequency > 0 && isValid(combo, range.spot.board)) {
          draft.matrix[i].strategy = frequencies.map(f => Number(f) * 10 / 1000)
        }
      }
    }))

    if (settings.deselectAfterBrush) {
      setSelected([])
    }
  }

  return (!range.spot.options) ? null : (
    <div className='border rounded py-3 px-4 flex flex-col text-neutral-300'>
      <h1 className='pb-1 text-neutral-400'>
        Brush
      </h1>
      <div className='pl-1 flex flex-col gap-[6px]'>
        {['fold / call', 'fold / call / raise'].includes(range.spot.state) &&
          <>
            <BrushOption
              range={range}
              option={{ type: 'fold' }}
              enabled={foldEnabled}
              display='Fold'
              frequency={foldEnabled ? frequencies[0] : 0}
              handleChange={e => handleFrequencyChange(e, 0)}
              handleClick={() => handleToggle('fold')}
              setAnyErrors={setAnyErrors}
              setOptionHover={setOptionHover}
              nrOptionsTotal={n}
            />
            <BrushOption
              range={range}
              option={{ type: 'call' }}
              enabled={callEnabled}
              display='Call'
              frequency={callEnabled ? (foldEnabled ? frequencies[1] : frequencies[0]) : 0}
              handleChange={e => handleFrequencyChange(e, foldEnabled ? 1 : 0)}
              handleClick={() => handleToggle('call')}
              setAnyErrors={setAnyErrors}
              setOptionHover={setOptionHover}
              nrOptionsTotal={n}
            />
          </>
        }
        {['check / bet'].includes(range.spot.state) &&
          <BrushOption
            range={range}
            option={{ type: 'check' }}
            enabled={checkEnabled}
            display='check'
            frequency={checkEnabled ? frequencies[0] : 0}
            handleChange={e => handleFrequencyChange(e, 0)}
            handleClick={() => handleToggle('check')}
            setAnyErrors={setAnyErrors}
            setOptionHover={setOptionHover}
            nrOptionsTotal={n}
          />
        }
        {range.options.filter(o => o.size).map((option, i) => (
          <BrushOption
            key={'size' + i}
            range={range}
            option={option}
            enabled
            display={`${option.size} bb`}
            frequency={frequencies[offset + i] ? frequencies[offset + i] : 0}
            handleChange={e => handleFrequencyChange(e, offset + i)}
            handleClick={() => handleRemoveOption(offset + i)}
            setAnyErrors={setAnyErrors}
            setOptionHover={setOptionHover}
            nrOptionsTotal={n}
          />
        ))}
      </div>
      {['fold / call / raise', 'check / bet'].includes(range.spot.state) && range.options.length < 10 &&
        <div
          className='pt-8 grid items-center gap-2'
          style={{ gridTemplateColumns: '235px auto' }}
        >
          <Input
            theme='editor'
            type='number'
            min={range.spot.min}
            max={range.spot.max}
            placeholder={`${range.spot.min} - ${range.spot.max}`}
            value={size}
            onChange={e => setSize(e.target.value)}
          />
          <Button
            theme='secondary'
            utilClasses='self-stretch py-0 px-3'
            text='add size'
            onClick={handleAddSize}
          />
        </div>
      }
      <BrushSlider
        range={range}
        frequencies={frequencies}
        setFrequencies={setFrequencies}
      />
      <Button
        theme='secondary'
        utilClasses='w-full py-3 px-4 justify-center'
        text='apply brush'
        icon='brush'
        disabled={anyErrors}
        onClick={handleApplyBrush}
      />
    </div>
  )
}