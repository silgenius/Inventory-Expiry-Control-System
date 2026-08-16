import { supabase } from "./supabaseClient";

export const PRODUCT_CATEGORIES = [
  "Medicine",
  "Food",
  "Beverages",
  "Cosmetics",
  "Household",
  "Electronics",
  "Other",
];

function mapRow(row) {
  return {
    id: row.out_batch_id ?? row.batch_id,
    productId: row.out_product_id ?? row.product_id,
    name: row.out_name ?? row.name,
    category: row.out_category ?? row.category,
    batchNumber: row.out_batch_number ?? row.batch_number,
    quantity: row.out_quantity ?? row.quantity,
    purchaseDate: row.out_purchase_date ?? row.purchase_date,
    expiryDate: row.out_expiry_date ?? row.expiry_date,
    supplier: row.out_supplier ?? row.supplier ?? "",
    description: row.out_description ?? row.description ?? "",
    createdAt: row.out_created_at ?? row.created_at,
  };
}

export async function getProducts() {
  const { data, error } = await supabase
    .from("product_batches_view")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data.map(mapRow);
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("product_batches_view")
    .select("*")
    .eq("batch_id", id)
    .single();
  if (error) throw new Error("Product could not be found.");
  return mapRow(data);
}

export async function createProduct(data) {
  const { data: row, error } = await supabase
    .rpc("create_product_batch", {
      p_name: data.name,
      p_category: data.category,
      p_batch_number: data.batchNumber,
      p_quantity: Number(data.quantity),
      p_purchase_date: data.purchaseDate,
      p_expiry_date: data.expiryDate,
      p_supplier: data.supplier || null,
      p_description: data.description || null,
    })
    .single();
  if (error) throw new Error(error.message);
  return mapRow(row);
}

export async function updateProduct(id, data) {
  const { data: row, error } = await supabase
    .rpc("update_product_batch", {
      p_batch_id: id,
      p_name: data.name,
      p_category: data.category,
      p_batch_number: data.batchNumber,
      p_quantity: Number(data.quantity),
      p_purchase_date: data.purchaseDate,
      p_expiry_date: data.expiryDate,
      p_supplier: data.supplier || null,
      p_description: data.description || null,
    })
    .single();
  if (error) throw new Error(error.message);
  return mapRow(row);
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from("product_batches")
    .delete()
    .eq("id", id);
  if (error) throw new Error("Product could not be deleted.");
  return true;
}
