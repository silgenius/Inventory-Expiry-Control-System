const PREFIX = 'iecs'

function buildKey(key) {
  return `${PREFIX}:${key}`
}

export function getItem(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(buildKey(key))
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch (error) {
    return fallback
  }
}

export function setItem(key, value) {
  try {
    window.localStorage.setItem(buildKey(key), JSON.stringify(value))
    return true
  } catch (error) {
    return false
  }
}

export function removeItem(key) {
  try {
    window.localStorage.removeItem(buildKey(key))
    return true
  } catch (error) {
    return false
  }
}

export const STORAGE_KEYS = {
  PRODUCTS: 'products',
  BUSINESS_PROFILE: 'business_profile',
  AUTH_SESSION: 'auth_session',
  ALERTS_READ: 'alerts_read',
  SETTINGS: 'settings',
  THEME: 'theme'
}
