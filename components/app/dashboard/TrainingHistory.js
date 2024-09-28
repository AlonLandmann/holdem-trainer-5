import { useEffect, useState } from 'react'

function formatDate(date) {
  const native = new Date(date)
  const year = native.getFullYear()
  const month = String(native.getMonth() + 1).padStart(2, '0')
  const day = String(native.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function TrainingHistory({ user }) {
  const [trainingHistory, setTrainingHistory] = useState(null)

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

  const today = new Date()
  const startCandidate1 = new Date(today.getFullYear(), today.getMonth() - 3, 1)
  const startCandidate2 = trainingHistory ? new Date(trainingHistory[trainingHistory.length - 1].date) : today
  const start = startCandidate1 > startCandidate2 ? startCandidate1 : startCandidate2
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  const diffInDays = (end - start) / 1000 / 3600 / 24
  const span = []

  for (let i = 0; i < diffInDays; i++) {
    span.push(formatDate((new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))))
  }

  function dailyMax() {
    return trainingHistory.reduce((acc, curr) => Math.max(acc, curr.total), 0)
  }

  function percentageHeight(num) {
    console.log(`${(num / dailyMax()).toFixed(0)}%`)
    return `${(100 * num / dailyMax()).toFixed(0)}%`
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
    const max = dailyMax()

    if (max > 100) { scale = 10 }
    if (max > 500) { scale = 50 }
    if (max > 1000) { scale = 100 }
    if (max > 5000) { scale = 500 }
    if (max > 10000) { scale = 1000 }

    return Math.floor(dailyMax() / scale) * scale
  }

  return !trainingHistory ? null : (
    <div>
      <h3 className='px-2 text-neutral-500 text-lg mb-2'>
        Training History
      </h3>
      <div className='inline-block p-3 pl-20 pb-5 pt-12 border rounded'>
        <div className='relative flex gap-[2px] items-end h-[200px]'>
          {span.map(day => (
            <div
              key={day}
              className='bg-neutral-600 w-[6px] rounded-sm z-10 opacity-70'
              style={{ height: percentageHeight(getNum(day)) }}
            >

            </div>
          ))}
          {Array(5).fill('').map((_, i) => (
            <div
              key={'grid-line' + i}
              className='absolute bottom-0 left-0 w-full h-[1px] bg-neutral-800 z-0'
              style={{ bottom: `${((tallestLine() / dailyMax()) * 200 * i * 0.25)}px` }}
            >

            </div>
          ))}
          {Array(5).fill('').map((_, i) => (
            <div
              key={'grid-line' + i}
              className='absolute bottom-0 -left-16 z-0 text-right w-12 text-sm font-mono text-neutral-500'
              style={{ bottom: `${((tallestLine() / dailyMax()) * 200 * i * 0.25) - 8}px` }}
            >
              {(tallestLine() * 0.25 * i).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}