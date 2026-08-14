import { getProducts } from './productService'
import { getExpiryStatus, EXPIRY_STATUS, getStatusLabel, getDaysRemaining } from '../utils/expiryUtils'

function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getInventorySummary() {
  await delay()
  const products = await getProducts()
  const totalQuantity = products.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
  return {
    totalProducts: products.length,
    totalQuantity,
    categories: new Set(products.map((item) => item.category)).size
  }
}

export async function getExpiryStatusDistribution() {
  await delay()
  const products = await getProducts()
  const counts = {}
  Object.values(EXPIRY_STATUS).forEach((status) => {
    counts[status] = 0
  })
  products.forEach((product) => {
    const status = getExpiryStatus(product.expiryDate)
    counts[status] += 1
  })
  return Object.entries(counts).map(([status, count]) => ({
    status,
    name: getStatusLabel(status),
    value: count
  }))
}

export async function getCategoryBreakdown() {
  await delay()
  const products = await getProducts()
  const counts = {}
  products.forEach((product) => {
    counts[product.category] = (counts[product.category] || 0) + 1
  })
  return Object.entries(counts).map(([category, count]) => ({ category, count }))
}

export async function getExpiringThisMonth() {
  await delay()
  const products = await getProducts()
  const now = new Date()
  return products.filter((product) => {
    const days = getDaysRemaining(product.expiryDate)
    const expiry = new Date(product.expiryDate)
    return days >= 0 && expiry.getMonth() === now.getMonth() && expiry.getFullYear() === now.getFullYear()
  })
}

export async function getExpiredProducts() {
  await delay()
  const products = await getProducts()
  return products.filter((product) => getExpiryStatus(product.expiryDate) === EXPIRY_STATUS.EXPIRED)
}
