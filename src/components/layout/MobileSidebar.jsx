import { useEffect } from 'react'
import { X } from 'lucide-react'
import Sidebar from './Sidebar'

export default function MobileSidebar({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        aria-label="Close menu"
        className="absolute inset-0 bg-navy-900/40"
        onClick={onClose}
      />
      <div className="relative z-10 h-full w-64 animate-[slide-in_0.2s_ease-out] shadow-popover">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="absolute right-3 top-4 z-10 rounded-lg p-1.5 text-navy-400 hover:bg-navy-100 dark:hover:bg-navy-700"
        >
          <X className="h-5 w-5" />
        </button>
        <Sidebar onNavigate={onClose} />
      </div>
    </div>
  )
}
