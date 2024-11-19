import A from '../_ui/A'

export default function SolverPlaceholder() {
  return (
    <div className='grow min-h-full p-5 flex flex-col justify-center items-center'>
      <h1 className='text-4xl xs:text-5xl text-nowrap mb-5'>
        <span className='font-decorative'>HT</span> - Solver
      </h1>
      <h3 className='text-2xl text-neutral-300 mb-5'>
        Coming soon!
      </h3>
      <p className='text-neutral-500 max-w-[45ch] text-lg text-center mb-10'>
        The Hold'em Trainer solver is currently in development.
        To learn more, reach out to us.
      </p>
      <div className='flex flex-col xs:flex-row gap-12 text-5xl'>
        <A href='https://discord.gg/SJ8wxuWVWW' icon='discord' />
        <A href='https://x.com/holdemtrainer' icon='twitter-x' />
        <A href='mailto:info@holdem-trainer.com' icon='send-fill' />
      </div>
    </div>
  )
}