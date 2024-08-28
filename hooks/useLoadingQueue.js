import { createContext, useContext, useState } from 'react'

const LoadingQueue = createContext()

export function useLoadingQueue() {
  return useContext(LoadingQueue)
}

export function LoadingQueueProvider({ children }) {
  const [loadingQueue, setLoadingQueue] = useState(false)

  return (
    <LoadingQueue.Provider value={[loadingQueue, setLoadingQueue]}>
      {children}
    </LoadingQueue.Provider>
  )
}