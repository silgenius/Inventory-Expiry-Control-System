import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Button from '../components/common/Button'
import { useToast } from '../hooks/useToast'
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage'
import { Sun, Moon } from 'lucide-react'

const BUSINESS_TYPES = [
  'Pharmacy', 'Supermarket', 'Provision Store', 'Warehouse',
  'Retail Store', 'Food Business', 'Cosmetics', 'Other'
].map((type) => ({ value: type, label: type }))

const defaultSettings = {
  warningPeriod: 30,
  criticalPeriod: 7,
  showExpiryNotifications: true,
  showExpiredAlerts: true,
  showDashboardWarnings: true
}

export default function Settings() {
  const { user, updateProfile } = useAuth()
  const { showToast } = useToast()

  const [profileValues, setProfileValues] = useState({
    businessName: user?.businessName || '',
    businessType: user?.businessType || '',
    businessAddress: user?.businessAddress || '',
    businessPhone: user?.businessPhone || '',
    businessEmail: user?.businessEmail || '',
    administratorName: user?.administratorName || ''
  })
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  const [settings, setSettings] = useState(() => getItem(STORAGE_KEYS.SETTINGS, defaultSettings))
  const [theme, setTheme] = useState(() => getItem(STORAGE_KEYS.THEME, 'light'))

  function updateProfileField(key, value) {
    setProfileValues((current) => ({ ...current, [key]: value }))
  }

  async function handleSaveProfile(event) {
    event.preventDefault()
    setIsSavingProfile(true)
    try {
      await updateProfile(profileValues)
      showToast('Business profile updated successfully.')
    } finally {
      setIsSavingProfile(false)
    }
  }

  function updateSetting(key, value) {
    const next = { ...settings, [key]: value }
    setSettings(next)
    setItem(STORAGE_KEYS.SETTINGS, next)
    showToast('Settings updated.')
  }

  function toggleTheme(nextTheme) {
    setTheme(nextTheme)
    setItem(STORAGE_KEYS.THEME, nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-navy-900 dark:text-navy-50">Settings</h2>
        <p className="mt-0.5 text-sm text-navy-500 dark:text-navy-400">Manage your business profile and preferences.</p>
      </div>

      <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:p-6">
        <h3 className="text-sm font-semibold text-navy-800 dark:text-navy-100">Business Profile</h3>
        <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
          <Input
            label="Business Name"
            value={profileValues.businessName}
            onChange={(event) => updateProfileField('businessName', event.target.value)}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              label="Business Type"
              placeholder="Select type"
              options={BUSINESS_TYPES}
              value={profileValues.businessType}
              onChange={(event) => updateProfileField('businessType', event.target.value)}
            />
            <Input
              label="Business Phone"
              value={profileValues.businessPhone}
              onChange={(event) => updateProfileField('businessPhone', event.target.value)}
            />
          </div>
          <Input
            label="Business Address"
            value={profileValues.businessAddress}
            onChange={(event) => updateProfileField('businessAddress', event.target.value)}
          />
          <Input
            label="Business Email"
            type="email"
            value={profileValues.businessEmail}
            onChange={(event) => updateProfileField('businessEmail', event.target.value)}
          />
          <Input
            label="Administrator Name"
            value={profileValues.administratorName}
            onChange={(event) => updateProfileField('administratorName', event.target.value)}
          />
          <div className="flex justify-end">
            <Button type="submit" isLoading={isSavingProfile}>
              Save Changes
            </Button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:p-6">
        <h3 className="text-sm font-semibold text-navy-800 dark:text-navy-100">Expiry Settings</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Warning Period (days)"
            type="number"
            min="1"
            value={settings.warningPeriod}
            onChange={(event) => updateSetting('warningPeriod', Number(event.target.value))}
            hint="Products with fewer days remaining than this show a warning status."
          />
          <Input
            label="Critical Period (days)"
            type="number"
            min="1"
            value={settings.criticalPeriod}
            onChange={(event) => updateSetting('criticalPeriod', Number(event.target.value))}
            hint="Products with fewer days remaining than this are treated as expiring soon."
          />
        </div>
      </section>

      <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:p-6">
        <h3 className="text-sm font-semibold text-navy-800 dark:text-navy-100">Notifications</h3>
        <div className="mt-4 space-y-3">
          <ToggleRow
            label="Show expiry notifications"
            checked={settings.showExpiryNotifications}
            onChange={(value) => updateSetting('showExpiryNotifications', value)}
          />
          <ToggleRow
            label="Show expired product alerts"
            checked={settings.showExpiredAlerts}
            onChange={(value) => updateSetting('showExpiredAlerts', value)}
          />
          <ToggleRow
            label="Show dashboard warnings"
            checked={settings.showDashboardWarnings}
            onChange={(value) => updateSetting('showDashboardWarnings', value)}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:p-6">
        <h3 className="text-sm font-semibold text-navy-800 dark:text-navy-100">Appearance</h3>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => toggleTheme('light')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium ${
              theme === 'light' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-navy-200 text-navy-500 dark:border-navy-700 dark:text-navy-300'
            }`}
          >
            <Sun className="h-4 w-4" /> Light
          </button>
          <button
            type="button"
            onClick={() => toggleTheme('dark')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium ${
              theme === 'dark' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-navy-200 text-navy-500 dark:border-navy-700 dark:text-navy-300'
            }`}
          >
            <Moon className="h-4 w-4" /> Dark
          </button>
        </div>
      </section>
    </div>
  )
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-xl border border-navy-100 px-4 py-3 dark:border-navy-700">
      <span className="text-sm font-medium text-navy-700 dark:text-navy-200">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-emerald-600' : 'bg-navy-200 dark:bg-navy-700'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </label>
  )
}
