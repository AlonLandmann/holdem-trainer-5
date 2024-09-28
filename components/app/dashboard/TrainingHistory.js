import { useEffect, useState } from 'react'

export default function TrainingHistory({ user }) {
  const [trainingHistory, setTrainingHistory] = useState(null)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/logs/training-history?userId=${user.id}`)
      const json = await res.json()

      if (json.success) {
        setTrainingHistory(json.trainingHistory)
      }
    })()
  }, [])

  return !trainingHistory ? null : (
    <div>
      <h3 className='px-2 text-neutral-500 text-lg mb-2'>
        Training History
      </h3>
      <div className='p-3 border rounded'>
      </div>
    </div>
  )
}