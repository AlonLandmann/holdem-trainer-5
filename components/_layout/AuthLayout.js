export default function AuthLayout({ children }) {
  return (
    <div className='min-h-screen bg-neutral-900 p-3 flex justify-center items-center'>
      {children}
    </div>
  )
}