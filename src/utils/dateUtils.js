const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

export function parseDate(value) {
  if (!value) return null
  const date = value instanceof Date ? new Date(value) : new Date(value)
  if (Number.isNaN(date.getTime())) return null
  date.setHours(0, 0, 0, 0)
  return date
}

export function formatDate(value) {
  const date = parseDate(value)
  if (!date) return '—'
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

export function formatDateInput(value) {
  const date = parseDate(value)
  if (!date) return ''
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function today() {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

export function daysBetween(fromDate, toDate) {
  const from = parseDate(fromDate)
  const to = parseDate(toDate)
  if (!from || !to) return null
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round((to.getTime() - from.getTime()) / msPerDay)
}

export function isBeforeDate(a, b) {
  const dateA = parseDate(a)
  const dateB = parseDate(b)
  if (!dateA || !dateB) return false
  return dateA.getTime() < dateB.getTime()
}

export function timeAgoLabel(days) {
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}
