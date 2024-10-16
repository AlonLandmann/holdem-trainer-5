import { useEffect, useRef, useState } from 'react'

export default function TrainingHistory({ user }) {
  const [trainingHistory, setTrainingHistory] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/logs/training-history?userId=${user.id}`)
      const json = await res.json()

      if (json.success) {
        setTrainingHistory(json.trainingHistory.map(o => ({
          ...o,
          date: formatDate(o.date),
        })))
      }
    })()
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth
    }
  }, [trainingHistory])

  const today = new Date()
  const startCandidate1 = new Date(today.getFullYear(), today.getMonth() - 3, 1)
  const startCandidate2 = (trainingHistory && trainingHistory[0]) ? new Date(trainingHistory[0].date) : today
  const start = startCandidate1.getTime() > startCandidate2.getTime() ? startCandidate1 : startCandidate2
  const end = today
  const diffInDays = (end - start) / 1000 / 3600 / 24
  const span = []
  const dailyMax = trainingHistory && trainingHistory.reduce((acc, curr) => Math.max(acc, curr.total), 0)
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const months = []


  if (trainingHistory) {
    for (let i = 0; i < diffInDays; i++) {
      const dt = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
      span.push(formatDate((dt)))
      const monthName = monthNames[dt.getMonth()]

      if (months.filter(({ name }) => name === monthName).length === 0) {
        months.push({ name: monthName, days: 1 })
      } else {
        if (months.length > 0) {
          months[months.length - 1].days += 1
        }
      }
    }
  }

  function formatDate(date) {
    const native = new Date(date)
    const year = native.getFullYear()
    const month = String(native.getMonth() + 1).padStart(2, '0')
    const day = String(native.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }


  function percentageHeight(num) {
    return `${(100 * num / dailyMax).toFixed(0)}%`
  }

  function getNum(day) {
    for (let i = 0; i < trainingHistory.length; i++) {
      if (trainingHistory[i].date === day) {
        return trainingHistory[i].total
      }
    }
  }

  function tallestLine() {
    let scale = 1

    if (dailyMax > 100) { scale = 10 }
    if (dailyMax > 500) { scale = 50 }
    if (dailyMax > 1000) { scale = 100 }
    if (dailyMax > 5000) { scale = 500 }
    if (dailyMax > 10000) { scale = 1000 }

    return Math.floor(dailyMax / scale) * scale
  }

  return !trainingHistory ? null : (
    <div className='mb-16 self-stretch flex justify-center'>
      <div className='pl-20 pt-12 max-w-full'>
        <div className='relative'>
          <div className='justify-center overflow-x-auto min-w-[500px]' ref={containerRef}>
            <div className='flex gap-[2px] items-end h-[200px]'>
              {span.map(day => (
                <div
                  key={day}
                  className='bg-neutral-600 z-10 min-w-2 opacity-80'
                  style={{ height: percentageHeight(getNum(day)) }}
                >

                </div>
              ))}
            </div>
            <div className='flex'>
              {months.map((month, i) => (
                <label
                  key={month.name}
                  className={`py-1 text-neutral-500 text-center ${i ? 'border-l pl-[2px]' : ''}`}
                  style={{ width: `${10 * month.days}px` }}
                >
                  {month.name}
                </label>
              ))}
            </div>
          </div>
          {Array(5).fill('').map((_, i) => (
            <div
              key={'grid-line' + i}
              className='absolute left-0 w-full h-[1px] bg-neutral-800 z-0'
              style={{ bottom: `${((tallestLine() / dailyMax) * 200 * i * 0.25) + 32}px` }}
            >

            </div>
          ))}
          {Array(5).fill('').map((_, i) => (
            <div
              key={'grid-line' + i}
              className='absolute -left-16 z-0 text-right w-12 text-sm font-mono text-neutral-500'
              style={{ bottom: `${((tallestLine() / dailyMax) * 200 * i * 0.25) + 24}px` }}
            >
              {(tallestLine() * 0.25 * i).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}