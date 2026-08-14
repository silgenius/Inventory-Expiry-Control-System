import { useMemo, useState } from 'react'
import { BellOff } from 'lucide-react'
import { useNotifications } from '../hooks/useNotifications'
import AlertCard from '../components/alerts/AlertCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import EmptyState from '../components/common/EmptyState'
import Select from '../components/common/Select'
import Button from '../components/common/Button'
import { useToast } from '../hooks/useToast'
import { EXPIRY_STATUS, getStatusLabel } from '../utils/expiryUtils'

const filterOptions = [
  { value: '', label: 'All Alert Types' },
  { value: EXPIRY_STATUS.EXPIRED, label: getStatusLabel(EXPIRY_STATUS.EXPIRED) },
  { value: EXPIRY_STATUS.EXPIRES_TODAY, label: getStatusLabel(EXPIRY_STATUS.EXPIRES_TODAY) },
  { value: EXPIRY_STATUS.EXPIRING_SOON, label: getStatusLabel(EXPIRY_STATUS.EXPIRING_SOON) },
  { value: EXPIRY_STATUS.WARNING, label: getStatusLabel(EXPIRY_STATUS.WARNING) }
]

export default function Alerts() {
  const { alerts, isLoading, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const { showToast } = useToast()
  const [statusFilter, setStatusFilter] = useState('')

  const filteredAlerts = useMemo(() => {
    if (!statusFilter) return alerts
    return alerts.filter((alert) => alert.status === statusFilter)
  }, [alerts, statusFilter])

  const criticalCount = alerts.filter(
    (alert) => alert.status === EXPIRY_STATUS.EXPIRED || alert.status === EXPIRY_STATUS.EXPIRES_TODAY
  ).length

  async function handleMarkAsRead(productId) {
    await markAsRead(productId)
    showToast('Alert marked as read.')
  }

  async function handleMarkAllAsRead() {
    await markAllAsRead()
    showToast('All alerts marked as read.')
  }

  if (isLoading) return <LoadingSpinner label="Loading alerts" size="lg" />

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-navy-900 dark:text-navy-50">Expiry Alerts</h2>
          <p className="mt-0.5 text-sm text-navy-500 dark:text-navy-400">Stay informed about products needing action.</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <SummaryTile label="Total Alerts" value={alerts.length} />
        <SummaryTile label="Unread Alerts" value={unreadCount} />
        <SummaryTile label="Critical Alerts" value={criticalCount} />
      </div>

      <div className="max-w-xs">
        <Select options={filterOptions} value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter alerts" />
      </div>

      {filteredAlerts.length === 0 ? (
        <EmptyState icon={BellOff} title="No Alerts" description="You're all caught up." />
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onMarkAsRead={handleMarkAsRead} />
          ))}
        </div>
      )}
    </div>
  )
}

function SummaryTile({ label, value }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <p className="text-xs font-medium text-navy-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-navy-900 dark:text-navy-50">{value}</p>
    </div>
  )
}
