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
        const user = json.user
        user.hasRanges = user.folders.reduce((acc, curr) => (
          acc || curr.ranges.length
        ), false)

        setUser(user || null)
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
