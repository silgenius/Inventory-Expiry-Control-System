import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Package, ShieldCheck, Clock, XCircle, PackagePlus } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useProducts } from '../hooks/useProducts'
import LoadingSpinner from '../components/common/LoadingSpinner'
import StatCard from '../components/dashboard/StatCard'
import ExpiryOverview from '../components/dashboard/ExpiryOverview'
import AttentionTable from '../components/dashboard/AttentionTable'
import RecentProducts from '../components/dashboard/RecentProducts'
import QuickActions from '../components/dashboard/QuickActions'
import { EXPIRY_STATUS, getExpiryStatus, getStatusLabel, sortByUrgency } from '../utils/expiryUtils'

export default function Dashboard() {
  const { user } = useAuth()
  const { products, isLoading } = useProducts()

  const stats = useMemo(() => {
    const counts = { safe: 0, expiring: 0, expired: 0 }
    products.forEach((product) => {
      const status = getExpiryStatus(product.expiryDate)
      if (status === EXPIRY_STATUS.SAFE) counts.safe += 1
      else if (status === EXPIRY_STATUS.EXPIRED) counts.expired += 1
      else counts.expiring += 1
    })
    return counts
  }, [products])

  const chartData = useMemo(() => {
    const counts = {}
    Object.values(EXPIRY_STATUS).forEach((status) => {
      counts[status] = 0
    })
    products.forEach((product) => {
      counts[getExpiryStatus(product.expiryDate)] += 1
    })
    return Object.entries(counts).map(([status, value]) => ({
      status,
      name: getStatusLabel(status),
      value
    }))
  }, [products])

  const attentionProducts = useMemo(() => sortByUrgency(products).slice(0, 6), [products])
  const recentProducts = useMemo(
    () => [...products].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 6),
    [products]
  )

  if (isLoading) {
    return <LoadingSpinner label="Loading your dashboard" size="lg" />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-navy-900 dark:text-navy-50">
            Good Morning{user?.administratorName ? `, ${user.administratorName}` : ''} 👋
          </h2>
          <p className="mt-0.5 text-sm text-navy-500 dark:text-navy-400">
            Here&apos;s your inventory and expiry overview{user?.businessName ? ` for ${user.businessName}` : ''}.
          </p>
        </div>
        <Link
          to="/products/add"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
        >
          <PackagePlus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Package} label="Total Products" value={products.length} sublabel="Across all categories" accent="navy" />
        <StatCard icon={ShieldCheck} label="Safe Products" value={stats.safe} sublabel="More than 30 days remaining" accent="emerald" />
        <StatCard icon={Clock} label="Expiring Soon" value={stats.expiring} sublabel="Within the next 30 days" accent="amber" />
        <StatCard icon={XCircle} label="Expired Products" value={stats.expired} sublabel="Requires immediate action" accent="red" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ExpiryOverview data={chartData} />
        </div>
        <QuickActions />
      </div>

      <AttentionTable products={attentionProducts} />
      <RecentProducts products={recentProducts} />
    </div>
  )
}
