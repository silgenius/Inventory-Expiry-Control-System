import { getItem, setItem, removeItem, STORAGE_KEYS } from '../utils/storage'

function delay(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function findAccounts() {
  return getItem('accounts', [])
}

function saveAccounts(accounts) {
  setItem('accounts', accounts)
}

export async function signup(data) {
  await delay()
  const accounts = findAccounts()
  const existing = accounts.find(
    (account) => account.businessEmail.toLowerCase() === data.businessEmail.toLowerCase()
  )
  if (existing) {
    throw new Error('An account with this email already exists.')
  }

  const account = {
    id: `acct-${Date.now()}`,
    businessName: data.businessName,
    businessType: data.businessType,
    businessAddress: data.businessAddress,
    businessPhone: data.businessPhone || '',
    businessEmail: data.businessEmail,
    administratorName: data.administratorName || ''
  }

  accounts.push({ ...account, password: data.password })
  saveAccounts(accounts)
  setItem(STORAGE_KEYS.BUSINESS_PROFILE, account)
  return account
}

export async function login(email, password) {
  await delay()
  const accounts = findAccounts()
  const account = accounts.find(
    (item) => item.businessEmail.toLowerCase() === email.toLowerCase()
  )

  if (!account || account.password !== password) {
    throw new Error('Invalid email or password.')
  }

  const { password: _password, ...profile } = account
  setItem(STORAGE_KEYS.AUTH_SESSION, { userId: profile.id, loggedInAt: new Date().toISOString() })
  setItem(STORAGE_KEYS.BUSINESS_PROFILE, profile)
  return profile
}

export async function logout() {
  await delay(150)
  removeItem(STORAGE_KEYS.AUTH_SESSION)
}

export function getCurrentUser() {
  const session = getItem(STORAGE_KEYS.AUTH_SESSION, null)
  if (!session) return null
  return getItem(STORAGE_KEYS.BUSINESS_PROFILE, null)
}

export function isAuthenticated() {
  return Boolean(getItem(STORAGE_KEYS.AUTH_SESSION, null))
}

export async function updateBusinessProfile(updates) {
  await delay(250)
  const current = getItem(STORAGE_KEYS.BUSINESS_PROFILE, {})
  const updated = { ...current, ...updates }
  setItem(STORAGE_KEYS.BUSINESS_PROFILE, updated)

  const accounts = findAccounts()
  const nextAccounts = accounts.map((account) =>
    account.id === updated.id ? { ...account, ...updates } : account
  )
  saveAccounts(nextAccounts)
  return updated
}

export async function requestPasswordReset(_email) {
  await delay(400)
  return { requested: true }
}
