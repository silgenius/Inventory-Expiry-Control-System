import { useCallback, useEffect, useState } from 'react'
import * as alertService from '../services/alertService'

export function useNotifications() {
  const [alerts, setAlerts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const loadAlerts = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await alertService.getAlerts()
      setAlerts(data)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAlerts()
  }, [loadAlerts])

  const markAsRead = useCallback(async (productId) => {
    await alertService.markAsRead(productId)
    setAlerts((current) =>
      current.map((alert) => (alert.productId === productId ? { ...alert, read: true } : alert))
    )
  }, [])

  const markAllAsRead = useCallback(async () => {
    const ids = alerts.map((alert) => alert.productId)
    await alertService.markAllAsRead(ids)
    setAlerts((current) => current.map((alert) => ({ ...alert, read: true })))
  }, [alerts])

  const unreadCount = alerts.filter((alert) => !alert.read).length

  return { alerts, isLoading, unreadCount, markAsRead, markAllAsRead, refresh: loadAlerts }
}
