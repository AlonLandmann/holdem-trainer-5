import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/auth/check')
        const json = await res.json()
        setUser(json.user || null)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}
