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
  const startCandidate2 = new Date(trainingHistory[trainingHistory.length - 1].date)
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

  console.log(start, end, diffInDays, span, trainingHistory, trainingHistory ? dailyMax() : '')

  return !trainingHistory ? null : (
    <div>
      <h3 className='px-2 text-neutral-500 text-lg mb-2'>
        Training History
      </h3>
      <div className='inline-block'>
        <div className='p-3 pt-12 flex gap-[2px] items-end h-[200px] border rounded'>
          {span.map(day => (
            <div key={day} className='bg-neutral-600 w-[6px] rounded-sm' style={{ height: percentageHeight(getNum(day)) }}>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}