import { Link } from 'react-router-dom'
import { AlertOctagon, AlertTriangle, Clock, XCircle } from 'lucide-react'
import { EXPIRY_STATUS, getStatusColor, getStatusLabel } from '../../utils/expiryUtils'

const ICONS = {
  [EXPIRY_STATUS.EXPIRED]: XCircle,
  [EXPIRY_STATUS.EXPIRES_TODAY]: AlertOctagon,
  [EXPIRY_STATUS.EXPIRING_SOON]: Clock,
  [EXPIRY_STATUS.WARNING]: AlertTriangle
}

const COLOR_CLASSES = {
  red: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
  orange: 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
}

function alertMessage(alert) {
  if (alert.status === EXPIRY_STATUS.EXPIRED) {
    return `Expired ${Math.abs(alert.daysRemaining)} day${Math.abs(alert.daysRemaining) === 1 ? '' : 's'} ago.`
  }
  if (alert.status === EXPIRY_STATUS.EXPIRES_TODAY) {
    return 'Expires today.'
  }
  return `Expires in ${alert.daysRemaining} day${alert.daysRemaining === 1 ? '' : 's'}.`
}

export default function AlertCard({ alert, onMarkAsRead }) {
  const Icon = ICONS[alert.status] || AlertTriangle
  const color = getStatusColor(alert.status)

  return (
    <div
      className={`flex items-start gap-4 rounded-2xl border p-4 shadow-card ${
        alert.read
          ? 'border-navy-100 bg-white dark:border-navy-700 dark:bg-navy-800'
          : 'border-emerald-100 bg-emerald-50/40 dark:border-emerald-900 dark:bg-navy-800'
      }`}
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${COLOR_CLASSES[color] || COLOR_CLASSES.amber}`}>
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-bold uppercase tracking-wide text-navy-500 dark:text-navy-400">
            {getStatusLabel(alert.status)}
          </p>
          {!alert.read && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-label="Unread" />}
        </div>
        <p className="mt-1 truncate text-sm font-semibold text-navy-900 dark:text-navy-50">{alert.productName}</p>
        <p className="text-xs text-navy-500 dark:text-navy-400">Batch {alert.batchNumber}</p>
        <p className="mt-1 text-sm text-navy-600 dark:text-navy-300">{alertMessage(alert)}</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link
            to={`/products/${alert.productId}`}
            className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
          >
            View Product
          </Link>
          {!alert.read && (
            <button
              type="button"
              onClick={() => onMarkAsRead(alert.productId)}
              className="text-sm font-medium text-navy-500 hover:text-navy-800 dark:text-navy-400 dark:hover:text-navy-100"
            >
              Mark as Read
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
