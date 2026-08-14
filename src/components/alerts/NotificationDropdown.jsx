import { Link } from 'react-router-dom'
import { Bell, AlertOctagon, AlertTriangle, Clock, XCircle } from 'lucide-react'
import { EXPIRY_STATUS, getStatusLabel } from '../../utils/expiryUtils'
import EmptyState from '../common/EmptyState'

const ICONS = {
  [EXPIRY_STATUS.EXPIRED]: XCircle,
  [EXPIRY_STATUS.EXPIRES_TODAY]: AlertOctagon,
  [EXPIRY_STATUS.EXPIRING_SOON]: Clock,
  [EXPIRY_STATUS.WARNING]: AlertTriangle
}

export default function NotificationDropdown({ alerts, onClose, onMarkAsRead }) {
  const recent = alerts.slice(0, 5)

  return (
    <div className="absolute right-0 top-full z-40 mt-2 w-80 rounded-2xl border border-navy-100 bg-white p-2 shadow-popover dark:border-navy-700 dark:bg-navy-800">
      <div className="flex items-center justify-between px-3 py-2">
        <p className="text-sm font-semibold text-navy-900 dark:text-navy-50">Notifications</p>
        <span className="text-xs text-navy-400">{alerts.filter((a) => !a.read).length} unread</span>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {recent.length === 0 ? (
          <div className="px-2 py-4">
            <EmptyState icon={Bell} title="No Alerts" description="You're all caught up." />
          </div>
        ) : (
          recent.map((alert) => {
            const Icon = ICONS[alert.status] || AlertTriangle
            return (
              <Link
                key={alert.id}
                to={`/products/${alert.productId}`}
                onClick={() => {
                  onMarkAsRead(alert.productId)
                  onClose()
                }}
                className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-navy-50 dark:hover:bg-navy-700"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy-800 dark:text-navy-100">{alert.productName}</p>
                  <p className="text-xs text-navy-500 dark:text-navy-400">{getStatusLabel(alert.status)}</p>
                </div>
                {!alert.read && <span className="ml-auto mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />}
              </Link>
            )
          })
        )}
      </div>
      <div className="border-t border-navy-100 p-2 dark:border-navy-700">
        <Link
          to="/alerts"
          onClick={onClose}
          className="block rounded-xl px-3 py-2 text-center text-sm font-medium text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-navy-700"
        >
          View All Alerts
        </Link>
      </div>
    </div>
  )
}
