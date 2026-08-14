import { createContext, useCallback, useState } from 'react'

export const ToastContext = createContext(null)

let idCounter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((message, variant = 'success') => {
    idCounter += 1
    const id = idCounter
    setToasts((current) => [...current, { id, message, variant }])
    setTimeout(() => {
      dismissToast(id)
    }, 3200)
  }, [dismissToast])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`animate-[fade-in_0.2s_ease-out] rounded-xl border px-4 py-3 text-sm font-medium shadow-popover ${
              toast.variant === 'error'
                ? 'border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300'
                : 'border-emerald-200 bg-white text-navy-800 dark:border-emerald-800 dark:bg-navy-800 dark:text-navy-100'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
