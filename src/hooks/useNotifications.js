import { useCallback, useEffect, useRef, useState } from "react";
import * as alertService from "../services/alertService";
import { supabase } from "../services/supabaseClient";

export function useNotifications() {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const channelRef = useRef(null);

  const loadAlerts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await alertService.getAlerts();
      setAlerts(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlerts();

    const channelName = `product_batches_changes_${Math.random().toString(36).slice(2)}`;
    const channel = supabase.channel(channelName);
    channelRef.current = channel;

    channel
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "product_batches" },
        () => loadAlerts(),
      )
      .subscribe();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [loadAlerts]);

  const markAsRead = useCallback(async (productId) => {
    await alertService.markAsRead(productId);
    setAlerts((current) =>
      current.map((alert) =>
        alert.productId === productId ? { ...alert, read: true } : alert,
      ),
    );
  }, []);

  const markAllAsRead = useCallback(async () => {
    const ids = alerts.map((alert) => alert.productId);
    await alertService.markAllAsRead(ids);
    setAlerts((current) => current.map((alert) => ({ ...alert, read: true })));
  }, [alerts]);

  const unreadCount = alerts.filter((alert) => !alert.read).length;

  return {
    alerts,
    isLoading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refresh: loadAlerts,
  };
}
