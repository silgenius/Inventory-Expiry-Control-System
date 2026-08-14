import { NavLink } from 'react-router-dom'
import {
  LayoutGrid, Package, Clock, Bell, FileBarChart, Settings, HelpCircle, LogOut, Boxes
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/products', label: 'Inventory / Products', icon: Package },
  { to: '/expiry-monitor', label: 'Expiry Monitor', icon: Clock },
  { to: '/alerts', label: 'Alerts', icon: Bell },
  { to: '/reports', label: 'Reports', icon: FileBarChart },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/help', label: 'Help', icon: HelpCircle }
]

export default function Sidebar({ onNavigate }) {
  const { user, logout } = useAuth()

  return (
    <div className="flex h-full w-64 flex-col border-r border-navy-100 bg-white dark:border-navy-700 dark:bg-navy-800">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
          <Boxes className="h-5 w-5" strokeWidth={2.25} />
        </div>
        <div>
          <p className="text-sm font-bold leading-tight text-navy-900 dark:text-navy-50">IECS</p>
          <p className="text-[11px] leading-tight text-navy-400">Inventory Expiry Control</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'text-navy-500 hover:bg-navy-50 hover:text-navy-800 dark:text-navy-400 dark:hover:bg-navy-700 dark:hover:text-navy-100'
              }`
            }
          >
            <item.icon className="h-4.5 w-4.5" strokeWidth={2} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-navy-100 p-3 dark:border-navy-700">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-100 text-sm font-semibold text-navy-600 dark:bg-navy-700 dark:text-navy-200">
            {(user?.administratorName || user?.businessName || 'U').charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-navy-800 dark:text-navy-100">
              {user?.administratorName || 'Administrator'}
            </p>
            <p className="truncate text-xs text-navy-400">{user?.businessName}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-500 hover:bg-red-50 hover:text-red-600 dark:text-navy-400 dark:hover:bg-red-950"
        >
          <LogOut className="h-4 w-4" strokeWidth={2} />
          Logout
        </button>
      </div>
    </div>
  )
}
