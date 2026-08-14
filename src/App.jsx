import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import AppRoutes from './routes/AppRoutes'
import { getItem, STORAGE_KEYS } from './utils/storage'

export default function App() {
  useEffect(() => {
    const theme = getItem(STORAGE_KEYS.THEME, 'light')
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [])

  return (
    <AuthProvider>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </AuthProvider>
  )
}
