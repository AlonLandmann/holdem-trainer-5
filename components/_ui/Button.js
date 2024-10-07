import { useLoadingQueue } from '@/hooks/useLoadingQueue'
import { useState } from 'react'

const themes = {
  primary: {
    container: 'rounded text-sm bg-neutral-700 text-neutral-300 transition hover:bg-neutral-600 disabled:hover:bg-neutral-700',
    icon: '',
    text: '',
  },
  secondary: {
    container: 'border text-sm text-neutral-400 rounded transition hover:text-neutral-200',
    icon: '',
    text: '',
  },
  tertiary: {
    container: 'text-neutral-400 transition hover:text-white',
    icon: '',
    text: 'text-sm',
  },
  answer: {
    container: `
      h-[50px] w-[120px] py-1 px-5 flex items-center gap-2 border rounded transition
      text-neutral-400 hover:text-neutral-50 hover:bg-neutral-800 hover:border-neutral-800
    `,
    hotkey: ' text-neutral-600',
    text: 'grow text-center',
  },
  link: {
    container: 'text-neutral-300 transition hover:text-neutral-400',
    icon: '',
    text: '',
  },
  nice: {
    container: 'bg-neutral-700 bg-opacity-50 hover:bg-opacity-70 font-medium rounded transition text-sm text-neutral-300',
    icon: '',
    text: '',
  }
}

export default function Button({
  theme = 'primary',
  utilClasses = '',
  icon,
  hotkey,
  text,
  type = 'button',
  onClick = async () => { },
  disabled = false,
  useQueue = false,
}) {
  const [loadingQueue, setLoadingQueue] = useLoadingQueue()
  const [loading, setLoading] = useState(false)

  async function handleQueuedExecution(event) {
    setLoading(true)
    setLoadingQueue(true)
    await onClick(event)
    setLoading(false)
    setLoadingQueue(false)
  }

  return (
    <button
      className={`
        relative
        ${(icon && text) ? 'flex items-center gap-3' : ''}
        ${themes[theme].container}
        ${utilClasses}
      `}
      type={type}
      onClick={useQueue ? handleQueuedExecution : onClick}
      disabled={disabled || (useQueue && loadingQueue)}
    >
      {loading &&
        <div className='absolute w-full left-0 flex justify-center'>
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
      {hotkey &&
        <span className={`${loading ? 'opacity-0' : ''} ${themes[theme].hotkey}`}>
          {hotkey}
        </span>
      }
      {icon &&
        <span className={`${loading ? 'opacity-0' : ''} ${themes[theme].icon}`}>
          <i className={`bi bi-${icon}`}></i>
        </span>
      }
      {text &&
        <span className={`${loading ? 'opacity-0' : ''} ${themes[theme].text}`}>
          {text}
        </span>
      }
    </button>
  )
}