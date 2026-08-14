import { getItem, setItem, STORAGE_KEYS } from '../utils/storage'
import { getProducts } from './productService'
import { getExpiryStatus, EXPIRY_STATUS, getDaysRemaining } from '../utils/expiryUtils'

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function readReadState() {
  return getItem(STORAGE_KEYS.ALERTS_READ, {})
}

function writeReadState(state) {
  setItem(STORAGE_KEYS.ALERTS_READ, state)
}

function buildAlerts(products) {
  const relevant = products.filter((product) => {
    const status = getExpiryStatus(product.expiryDate)
    return (
      status === EXPIRY_STATUS.EXPIRED ||
      status === EXPIRY_STATUS.EXPIRES_TODAY ||
      status === EXPIRY_STATUS.EXPIRING_SOON ||
      status === EXPIRY_STATUS.WARNING
    )
  })

  const readState = readReadState()

  return relevant
    .map((product) => {
      const status = getExpiryStatus(product.expiryDate)
      const days = getDaysRemaining(product.expiryDate)
      return {
        id: `alert-${product.id}`,
        productId: product.id,
        productName: product.name,
        batchNumber: product.batchNumber,
        status,
        daysRemaining: days,
        read: Boolean(readState[product.id])
      }
    })
    .sort((a, b) => a.daysRemaining - b.daysRemaining)
}

export async function getAlerts() {
  await delay()
  const products = await getProducts()
  return buildAlerts(products)
}

export async function markAsRead(productId) {
  await delay(120)
  const readState = readReadState()
  readState[productId] = true
  writeReadState(readState)
  return true
}

export async function markAllAsRead(productIds) {
  await delay(180)
  const readState = readReadState()
  productIds.forEach((id) => {
    readState[id] = true
  })
  writeReadState(readState)
  return true
}
