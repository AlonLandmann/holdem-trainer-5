import { LoadingQueueProvider } from '@/hooks/useLoadingQueue'
import { UserProvider } from '@/hooks/useUser'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <LoadingQueueProvider>
      <UserProvider>
        <Component {...pageProps} />
        <Toaster
          position='top-right'
          toastOptions={{
            style: {
              border: '1px solid rgb(38, 38, 38)',
              color: 'rgb(229, 229, 229)',
              backgroundColor: 'rgb(23, 23, 23)',
              opacity: 0.8,
            }
          }}
        />
      </UserProvider>
    </LoadingQueueProvider>
  )
}