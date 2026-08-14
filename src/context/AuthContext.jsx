import { createContext, useCallback, useEffect, useState } from 'react'
import * as authService from '../services/authService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const profile = await authService.login(email, password)
    setUser(profile)
    return profile
  }, [])

  const signup = useCallback(async (data) => {
    const profile = await authService.signup(data)
    return profile
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
  }, [])

  const updateProfile = useCallback(async (updates) => {
    const profile = await authService.updateBusinessProfile(updates)
    setUser(profile)
    return profile
  }, [])

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    signup,
    logout,
    updateProfile
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
