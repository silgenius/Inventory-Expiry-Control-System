import { getItem, setItem, STORAGE_KEYS } from '../utils/storage'
import { mockProducts } from '../data/mockProducts'
import { isBeforeDate } from '../utils/dateUtils'

function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function readProducts() {
  const existing = getItem(STORAGE_KEYS.PRODUCTS, null)
  if (existing && Array.isArray(existing) && existing.length > 0) {
    return existing
  }
  setItem(STORAGE_KEYS.PRODUCTS, mockProducts)
  return mockProducts
}

function writeProducts(products) {
  setItem(STORAGE_KEYS.PRODUCTS, products)
}

export async function getProducts() {
  await delay()
  return readProducts()
}

export async function getProductById(id) {
  await delay(150)
  const products = readProducts()
  const product = products.find((item) => item.id === id)
  if (!product) throw new Error('Product could not be found.')
  return product
}

function validateProduct(data) {
  if (!data.name || !data.name.trim()) throw new Error('Product name required.')
  if (!data.category) throw new Error('Category required.')
  if (!data.batchNumber || !data.batchNumber.trim()) throw new Error('Batch number required.')
  if (data.quantity === '' || data.quantity === null || Number(data.quantity) < 0) {
    throw new Error('Quantity must be greater than or equal to zero.')
  }
  if (!data.purchaseDate) throw new Error('Purchase date required.')
  if (!data.expiryDate) throw new Error('Expiry date required.')
  if (isBeforeDate(data.expiryDate, data.purchaseDate)) {
    throw new Error('Expiry date cannot be before purchase date.')
  }
}

export async function createProduct(data) {
  await delay(300)
  validateProduct(data)
  const products = readProducts()
  const product = {
    id: `prod-${Date.now()}`,
    name: data.name.trim(),
    category: data.category,
    batchNumber: data.batchNumber.trim(),
    quantity: Number(data.quantity),
    purchaseDate: data.purchaseDate,
    expiryDate: data.expiryDate,
    supplier: data.supplier || '',
    description: data.description || '',
    createdAt: new Date().toISOString().slice(0, 10)
  }
  const next = [product, ...products]
  writeProducts(next)
  return product
}

export async function updateProduct(id, data) {
  await delay(300)
  validateProduct(data)
  const products = readProducts()
  let updated = null
  const next = products.map((item) => {
    if (item.id !== id) return item
    updated = {
      ...item,
      name: data.name.trim(),
      category: data.category,
      batchNumber: data.batchNumber.trim(),
      quantity: Number(data.quantity),
      purchaseDate: data.purchaseDate,
      expiryDate: data.expiryDate,
      supplier: data.supplier || '',
      description: data.description || ''
    }
    return updated
  })
  if (!updated) throw new Error('Product could not be updated.')
  writeProducts(next)
  return updated
}

export async function deleteProduct(id) {
  await delay(250)
  const products = readProducts()
  const exists = products.some((item) => item.id === id)
  if (!exists) throw new Error('Product could not be deleted.')
  writeProducts(products.filter((item) => item.id !== id))
  return true
}

export const PRODUCT_CATEGORIES = [
  'Medicine',
  'Food',
  'Beverages',
  'Cosmetics',
  'Household',
  'Electronics',
  'Other'
]
