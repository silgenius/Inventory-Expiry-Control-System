import { getStatusLabel } from "../utils/expiryUtils";
import { supabase } from "./supabaseClient";

async function fetchSummary() {
  const { data, error } = await supabase.rpc("get_report_summary").single();
  if (error) throw new Error(error.message);
  return data;
}

export async function getInventorySummary() {
  const d = await fetchSummary();
  return {
    totalProducts: d.total_products,
    totalQuantity: d.total_quantity,
    categories: d.total_categories,
  };
}

export async function getExpiryStatusDistribution() {
  const d = await fetchSummary();
  return d.distribution.map((row) => ({
    status: row.status,
    name: getStatusLabel(row.status),
    value: row.count,
  }));
}

export async function getCategoryBreakdown() {
  const d = await fetchSummary();
  return d.category_breakdown.map((row) => ({
    category: row.category,
    count: row.count,
  }));
}

export async function getExpiringThisMonth() {
  const d = await fetchSummary();
  return d.expiring_this_month;
}

export async function getExpiredProducts() {
  const d = await fetchSummary();
  return d.expired_products;
}
