import { supabase } from "./supabaseClient";

function mapAlert(row) {
  return {
    id: `alert-${row.batch_id}`,
    productId: row.batch_id,
    productName: row.product_name,
    batchNumber: row.batch_number,
    status: row.status,
    daysRemaining: row.days_remaining,
    read: row.read,
  };
}

export async function getAlerts() {
  const { data, error } = await supabase
    .from("alerts_view")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data.map(mapAlert);
}

export async function markAsRead(productId) {
  const { error } = await supabase.rpc("mark_alert_read", {
    p_batch_id: productId,
  });
  if (error) throw new Error(error.message);
  return true;
}

export async function markAllAsRead(productIds) {
  const { error } = await supabase.rpc("mark_all_alerts_read", {
    p_batch_ids: productIds,
  });
  if (error) throw new Error(error.message);
  return true;
}
