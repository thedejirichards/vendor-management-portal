import { createContext, useContext, useState, type ReactNode } from 'react'
import { users, type AppUser } from '../data/users'

interface UserContextValue {
  currentUser: AppUser
  setCurrentUser: (user: AppUser) => void
}

const UserContext = createContext<UserContextValue | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AppUser>(users[0])

  return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>
}

export function useCurrentUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useCurrentUser must be used within a UserProvider')
  return ctx
}
