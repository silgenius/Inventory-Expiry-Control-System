import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import LoadingSpinner from '../components/common/LoadingSpinner'
import EmptyState from '../components/common/EmptyState'
import ProductTable from '../components/products/ProductTable'
import ProductCard from '../components/products/ProductCard'
import Modal from '../components/common/Modal'
import Button from '../components/common/Button'
import { useToast } from '../hooks/useToast'
import * as productService from '../services/productService'
import { EXPIRY_STATUS, getExpiryStatus, getStatusLabel, sortByUrgency } from '../utils/expiryUtils'

const TABS = ['all', ...Object.values(EXPIRY_STATUS)]

export default function ExpiryMonitor() {
  const { products, isLoading, refresh } = useProducts()
  const { showToast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'all'
  const [productToDelete, setProductToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const grouped = useMemo(() => {
    const counts = { safe: 0, warning: 0, expiring_soon: 0, expired: 0 }
    products.forEach((product) => {
      const status = getExpiryStatus(product.expiryDate)
      if (counts[status] !== undefined) counts[status] += 1
    })
    return counts
  }, [products])

  const filtered = useMemo(() => {
    const sorted = sortByUrgency(products)
    if (activeTab === 'all') return sorted
    return sorted.filter((product) => getExpiryStatus(product.expiryDate) === activeTab)
  }, [products, activeTab])

  async function handleConfirmDelete() {
    if (!productToDelete) return
    setIsDeleting(true)
    try {
      await productService.deleteProduct(productToDelete.id)
      showToast('Product deleted successfully.')
      await refresh()
    } catch (error) {
      showToast(error.message || 'Product could not be deleted.', 'error')
    } finally {
      setIsDeleting(false)
      setProductToDelete(null)
    }
  }

  if (isLoading) return <LoadingSpinner label="Loading expiry monitor" size="lg" />

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-navy-900 dark:text-navy-50">Expiry Monitor</h2>
        <p className="mt-0.5 text-sm text-navy-500 dark:text-navy-400">Monitor products according to their shelf life.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryCard label="Safe" value={grouped.safe} color="emerald" />
        <SummaryCard label="Warning" value={grouped.warning} color="amber" />
        <SummaryCard label="Expiring Soon" value={grouped.expiring_soon} color="orange" />
        <SummaryCard label="Expired" value={grouped.expired} color="red" />
      </div>

      <div className="flex gap-1.5 overflow-x-auto rounded-xl border border-navy-100 bg-white p-1.5 dark:border-navy-700 dark:bg-navy-800">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setSearchParams(tab === 'all' ? {} : { tab })}
            className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-emerald-600 text-white'
                : 'text-navy-500 hover:bg-navy-50 dark:text-navy-300 dark:hover:bg-navy-700'
            }`}
          >
            {tab === 'all' ? 'All' : getStatusLabel(tab)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={ShieldCheck} title="No products in this category" description="Try selecting a different tab." />
      ) : (
        <>
          <ProductTable products={filtered} onDeleteRequest={setProductToDelete} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onDeleteRequest={setProductToDelete} />
            ))}
          </div>
        </>
      )}

      <Modal
        isOpen={Boolean(productToDelete)}
        onClose={() => setProductToDelete(null)}
        title="Delete Product?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setProductToDelete(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete} isLoading={isDeleting}>
              Delete
            </Button>
          </>
        }
      >
        Are you sure you want to delete {productToDelete?.name}? This action cannot be undone.
      </Modal>
    </div>
  )
}

function SummaryCard({ label, value, color }) {
  const colorClasses = {
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    orange: 'text-orange-600',
    red: 'text-red-600'
  }
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <p className="text-xs font-medium text-navy-400">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
    </div>
  )
}
