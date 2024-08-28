import { LoadingQueueProvider } from '@/hooks/useLoadingQueue'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <LoadingQueueProvider>
      <Component {...pageProps} />
      <Toaster
        toastOptions={{
          style: {
            border: '1px solid rgb(38, 38, 38)',
            color: 'rgb(229, 229, 229)',
            backgroundColor: 'rgb(23, 23, 23)',
            opacity: 0.8,
          }
        }}
      />
    </LoadingQueueProvider>
  )
}