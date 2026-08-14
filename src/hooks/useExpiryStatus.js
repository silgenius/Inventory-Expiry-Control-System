import { useMemo } from 'react'
import { getDaysRemaining, getExpiryStatus, getDaysRemainingLabel, getStatusLabel } from '../utils/expiryUtils'

export function useExpiryStatus(expiryDate) {
  return useMemo(() => {
    const status = getExpiryStatus(expiryDate)
    const days = getDaysRemaining(expiryDate)
    return {
      status,
      days,
      statusLabel: getStatusLabel(status),
      daysLabel: getDaysRemainingLabel(expiryDate)
    }
  }, [expiryDate])
}
