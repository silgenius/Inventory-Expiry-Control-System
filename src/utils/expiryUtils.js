import { daysBetween, today, timeAgoLabel } from './dateUtils'

export const EXPIRY_STATUS = {
  SAFE: 'safe',
  WARNING: 'warning',
  EXPIRING_SOON: 'expiring_soon',
  EXPIRES_TODAY: 'expires_today',
  EXPIRED: 'expired'
}

const STATUS_META = {
  [EXPIRY_STATUS.SAFE]: {
    label: 'Safe',
    description: 'More than 30 days remaining before expiry.',
    color: 'emerald'
  },
  [EXPIRY_STATUS.WARNING]: {
    label: 'Warning',
    description: 'Between 8 and 30 days remaining before expiry.',
    color: 'amber'
  },
  [EXPIRY_STATUS.EXPIRING_SOON]: {
    label: 'Expiring Soon',
    description: 'Between 1 and 7 days remaining before expiry.',
    color: 'orange'
  },
  [EXPIRY_STATUS.EXPIRES_TODAY]: {
    label: 'Expires Today',
    description: 'This product expires today.',
    color: 'red'
  },
  [EXPIRY_STATUS.EXPIRED]: {
    label: 'Expired',
    description: 'The expiry date for this product has passed.',
    color: 'red'
  }
}

export function getDaysRemaining(expiryDate, referenceDate = today()) {
  return daysBetween(referenceDate, expiryDate)
}

export function getExpiryStatus(expiryDate, referenceDate = today()) {
  const days = getDaysRemaining(expiryDate, referenceDate)
  if (days === null) return null
  if (days < 0) return EXPIRY_STATUS.EXPIRED
  if (days === 0) return EXPIRY_STATUS.EXPIRES_TODAY
  if (days <= 7) return EXPIRY_STATUS.EXPIRING_SOON
  if (days <= 30) return EXPIRY_STATUS.WARNING
  return EXPIRY_STATUS.SAFE
}

export function getStatusLabel(status) {
  return STATUS_META[status]?.label ?? 'Unknown'
}

export function getStatusDescription(status) {
  return STATUS_META[status]?.description ?? ''
}

export function getStatusColor(status) {
  return STATUS_META[status]?.color ?? 'navy'
}

export function getDaysRemainingLabel(expiryDate, referenceDate = today()) {
  const days = getDaysRemaining(expiryDate, referenceDate)
  if (days === null) return '—'
  if (days === 0) return 'Expires today'
  if (days < 0) return `Expired ${timeAgoLabel(Math.abs(days))}`
  if (days === 1) return '1 day left'
  return `${days} days left`
}

export const EXPIRY_STATUS_ORDER = [
  EXPIRY_STATUS.EXPIRED,
  EXPIRY_STATUS.EXPIRES_TODAY,
  EXPIRY_STATUS.EXPIRING_SOON,
  EXPIRY_STATUS.WARNING,
  EXPIRY_STATUS.SAFE
]

export function sortByUrgency(products) {
  return [...products].sort((a, b) => {
    const daysA = getDaysRemaining(a.expiryDate)
    const daysB = getDaysRemaining(b.expiryDate)
    if (daysA === null) return 1
    if (daysB === null) return -1
    return daysA - daysB
  })
}
