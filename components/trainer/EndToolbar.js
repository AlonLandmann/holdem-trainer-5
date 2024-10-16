import Button from '../_ui/Button'

export default function EndToolbar({ setPage, setStats, fetchUser }) {
  async function handleSelectRanges() {
    await fetchUser()
    setStats([])
    setPage('start')
  }

  async function handleTrainAgain() {
    await fetchUser()
    setStats([])
    setPage('session')
  }

  return (
    <div className='border-b h-[49px] flex items-center px-3'>
      <h1 className='text-neutral-500 mr-auto'>
        Trainer
      </h1>
      <Button
        theme='secondary'
        utilClasses='h-[39px] px-3 gap-1 rounded-sm'
        icon='ui-checks'
        text='Choose ranges'
        onClick={handleSelectRanges}
        useQueue
      />
      <Button
        theme='nice'
        utilClasses='h-[39px] px-3 gap-1 rounded-sm ml-1'
        icon='arrow-counterclockwise'
        text='Train again'
        onClick={handleTrainAgain}
        useQueue
      />
    </div>
  )
}