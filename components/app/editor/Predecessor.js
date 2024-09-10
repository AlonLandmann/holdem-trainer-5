import { useUser } from '@/hooks/useUser'
import { produce } from 'immer'
import { useEffect, useState } from 'react'

export default function Predecessor({ range, setRange }) {
  const [user, setUser] = useUser()
  const [candidates, setCandidates] = useState([])
  const [predecessorId, setPredecessorId] = useState(range.predecessorId || '')
  const [loading, setLoading] = useState(false)

  const index = range.spot.linkIndex

  useEffect(() => {
    setLoading(true)
  }, [user, range.history])

  useEffect(() => {
    (async () => {
      if (loading) {
        if (!user || !user.id || !range.spot.options || typeof index !== 'number') {
          setLoading(false)
          return null
        }

        const historyToMatch = JSON.stringify(range.history.slice(0, index))
        const optionAsAction = { ...range.history[index] }

        if (optionAsAction) {
          delete optionAsAction.p
        }

        const optionToMatch = JSON.stringify(optionAsAction)
        const res = await fetch(`/api/ranges/find-predecessors?userId=${user.id}&history=${historyToMatch}&option=${optionToMatch}`)
        const json = await res.json()

        if (!json.success) {
          setLoading(false)
          return null
        }

        setCandidates(json.ranges.filter(r => r.id != range.id))
        setLoading(false)
      }
    })()
  }, [loading])

  function handleChange(event) {
    const id = Number(event.target.value)
    setPredecessorId(id)

    if (id === '') {
      setRange(produce(draft => {
        draft.predecessorId = null

        for (let i = 0; i < draft.matrix.length; i++) {
          draft.matrix[i].frequency = 1
        }
      }))
    } else {
      const candidate = candidates.find(c => c.id === id)
      const action = range.history[index]
      const actionIndex = candidate.options.findIndex(o => (
        (o.type === action.type) &&
        (!action.size || o.size === action.size)
      ))

      setRange(produce(draft => {
        draft.predecessorId = id

        for (let i = 0; i < draft.matrix.length; i++) {
          draft.matrix[i].frequency = candidate.matrix[i].frequency * candidate.matrix[i].strategy[actionIndex]
        }
      }))
    }
  }

  return (!range.spot.options || typeof index !== 'number' || !user) ? null : (
    <div className='border-b py-3 px-4 flex flex-col bg-neutral-[#202020] opacity-80'>
      <h1 className='pb-3 text-neutral-400'>
        Link
      </h1>
      <div className='relative min-h-8'>
        {!loading &&
          <select  className='appearance-none w-full' value={predecessorId} onChange={handleChange}>
            <option value=''>-- select a range --</option>
            {candidates.map(candidate => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name}
              </option>
            ))}
          </select>
        }
        {loading &&
          <div className='absolute w-full left-0 flex justify-center min-h-4'>
            <span className='inline-block animate-pulse'>
              ·
            </span>
            <span className='inline-block animate-pulse [animation-delay:0.2s]'>
              ·
            </span>
            <span className='inline-block animate-pulse [animation-delay:1s]'>
              ·
            </span>
          </div>
        }
      </div>
    </div>
  )
}