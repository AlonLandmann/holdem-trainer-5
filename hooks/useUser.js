import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/auth/check')
        const json = await res.json()
        const user = json.user

        // hydrate
        user.hasRanges = user.folders.reduce((acc, curr) => (
          acc || curr.ranges.length
        ), false)

        user.nrRanges = user.folders.reduce((acc, curr) => (
          acc + curr.ranges.length
        ), 0)

        setUser(user || null)
      } catch (error) {
        console.log(error)
      }

      setIsLoading(false)
    })()
  }, [])

  return (
    <UserContext.Provider value={[user, setUser, isLoading]}>
      {children}
    </UserContext.Provider>
  )
}
