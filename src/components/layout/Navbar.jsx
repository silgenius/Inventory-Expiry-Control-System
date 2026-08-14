import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useNotifications } from '../../hooks/useNotifications'
import NotificationDropdown from '../alerts/NotificationDropdown'

export default function Navbar({ onMenuClick, title }) {
  const { user, logout } = useAuth()
  const { alerts, unreadCount, markAsRead } = useNotifications()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-navy-100 bg-white/90 px-4 py-3.5 backdrop-blur sm:px-6 dark:border-navy-700 dark:bg-navy-800/90">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-lg p-1.5 text-navy-500 hover:bg-navy-100 lg:hidden dark:hover:bg-navy-700"
        >
          <Menu className="h-5 w-5" />
        </button>
        {title && <h1 className="truncate text-base font-semibold text-navy-900 sm:text-lg dark:text-navy-50">{title}</h1>}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications((value) => !value)
              setShowProfile(false)
            }}
            aria-label="Notifications"
            className="relative rounded-xl p-2 text-navy-500 hover:bg-navy-100 dark:hover:bg-navy-700"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <NotificationDropdown
              alerts={alerts}
              onClose={() => setShowNotifications(false)}
              onMarkAsRead={markAsRead}
            />
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowProfile((value) => !value)
              setShowNotifications(false)
            }}
            className="flex items-center gap-2 rounded-xl px-1.5 py-1 hover:bg-navy-100 dark:hover:bg-navy-700"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              {(user?.administratorName || user?.businessName || 'U').charAt(0).toUpperCase()}
            </div>
            <ChevronDown className="hidden h-4 w-4 text-navy-400 sm:block" />
          </button>
          {showProfile && (
            <div className="absolute right-0 top-full z-40 mt-2 w-52 rounded-2xl border border-navy-100 bg-white p-1.5 shadow-popover dark:border-navy-700 dark:bg-navy-800">
              <div className="px-3 py-2">
                <p className="truncate text-sm font-medium text-navy-800 dark:text-navy-100">
                  {user?.administratorName || 'Administrator'}
                </p>
                <p className="truncate text-xs text-navy-400">{user?.businessEmail}</p>
              </div>
              <div className="my-1 border-t border-navy-100 dark:border-navy-700" />
              <Link
                to="/settings"
                onClick={() => setShowProfile(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-navy-600 hover:bg-navy-50 dark:text-navy-300 dark:hover:bg-navy-700"
              >
                <User className="h-4 w-4" /> Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setShowProfile(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-navy-600 hover:bg-navy-50 dark:text-navy-300 dark:hover:bg-navy-700"
              >
                <Settings className="h-4 w-4" /> Settings
              </Link>
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
