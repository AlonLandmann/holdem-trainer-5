import { useLoadingQueue } from '@/hooks/useLoadingQueue'
import { useState } from 'react'
import LoadingDots from './LoadingDots'

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
  link: {
    container: 'text-neutral-300 transition hover:text-neutral-400',
    icon: '',
    text: '',
  },
  nice: {
    container: 'bg-neutral-700 bg-opacity-50 hover:bg-opacity-70 font-medium rounded transition text-sm text-neutral-300',
    icon: '',
    text: '',
  },
  sidenav: {
    container: 'w-full px-3 py-2 rounded text-neutral-400 transition hover:bg-neutral-800 hover:text-white cursor-pointer',
    icon: '',
    text: 'text-sm',
  },
  answer: {
    container: 'h-14 w-32 py-1 px-5 flex items-center gap-2 border rounded transition text-neutral-400 hover:text-neutral-50 hover:bg-neutral-800 hover:border-neutral-800',
    hotkey: 'text-neutral-600',
    text: 'grow text-center',
  },
}

export default function Button({
  theme = 'primary',
  utilClasses = '',
  iconClasses = '',
  textClasses = '',
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
      type={type}
      onClick={useQueue ? handleQueuedExecution : onClick}
      disabled={disabled || (useQueue && loadingQueue)}
      className={`
        relative
        ${(icon && text) ? 'flex items-center gap-3' : ''}
        ${themes[theme].container}
        ${utilClasses}
        ${disabled ? 'opacity-50' : ''}
      `}
    >
      {loading &&
        <LoadingDots />
      }
      {hotkey &&
        <span className={`${loading ? 'opacity-0' : ''} ${themes[theme].hotkey}`}>
          {hotkey}
        </span>
      }
      {icon &&
        <span className={`${loading ? 'opacity-0' : ''} ${themes[theme].icon} ${iconClasses}`}>
          <i className={`bi bi-${icon}`}></i>
        </span>
      }
      {text &&
        <span className={`${loading ? 'opacity-0' : ''} ${themes[theme].text} ${textClasses}`}>
          {text}
        </span>
      }
    </button>
  )
}