import { useLoadingQueue } from '@/hooks/useLoadingQueue'
import { useState } from 'react';

const themes = {
  primary: {
    container: 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600 disabled:hover:bg-neutral-700',
    icon: '',
    text: '',
  },
  secondary: {
    container: '',
    icon: '',
    text: '',
  },
  tertiary: {
    container: '',
    icon: '',
    text: '',
  },
}

export default function Button({
  theme = 'primary',
  utilClasses = '',
  icon,
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
        py-3 px-5 rounded text-sm transition
        ${themes[theme].container}
        ${utilClasses}
      `}
      type={type}
      onClick={useQueue ? handleQueuedExecution : onClick}
      disabled={disabled || (useQueue && loadingQueue)}
    >
      {loading &&
        <div className='inline-block'>
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
      {!loading && icon &&
        <span className={themes[theme].icon}>
          <i className={`bi bi-${icon}`}></i>
        </span>
      }
      {!loading && text &&
        <span className={themes[theme].text}>
          {text}
        </span>
      }
    </button>
  )
}