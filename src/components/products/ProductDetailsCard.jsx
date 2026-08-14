import { Package, Calendar, Hash, Layers, Truck, FileText } from 'lucide-react'
import ProductStatusBadge from './ProductStatusBadge'
import { formatDate } from '../../utils/dateUtils'
import { getDaysRemainingLabel, getExpiryStatus, getStatusDescription } from '../../utils/expiryUtils'

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-500 dark:bg-navy-700 dark:text-navy-300">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </div>
      <div>
        <p className="text-xs text-navy-400">{label}</p>
        <p className="text-sm font-medium text-navy-800 dark:text-navy-100">{value || '—'}</p>
      </div>
    </div>
  )
}

export default function ProductDetailsCard({ product }) {
  const status = getExpiryStatus(product.expiryDate)

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <DetailRow icon={Package} label="Product Name" value={product.name} />
          <DetailRow icon={Layers} label="Category" value={product.category} />
          <DetailRow icon={Hash} label="Batch Number" value={product.batchNumber} />
          <DetailRow icon={Package} label="Quantity" value={product.quantity} />
          <DetailRow icon={Truck} label="Supplier" value={product.supplier} />
          <DetailRow icon={FileText} label="Description" value={product.description} />
        </div>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
        <h3 className="text-sm font-semibold text-navy-800 dark:text-navy-100">Expiry Status</h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <ProductStatusBadge status={status} className="text-sm" />
          <span className="text-lg font-bold text-navy-900 dark:text-navy-50">
            {getDaysRemainingLabel(product.expiryDate)}
          </span>
        </div>
        <p className="mt-2 text-sm text-navy-500 dark:text-navy-400">{getStatusDescription(status)}</p>
        <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">Expiry: {formatDate(product.expiryDate)}</p>

        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy-400">Expiry Timeline</p>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <TimelinePoint icon={Calendar} label="Purchase Date" value={formatDate(product.purchaseDate)} />
            <TimelineConnector />
            <TimelinePoint icon={Calendar} label="Current Date" value={formatDate(new Date())} active />
            <TimelineConnector />
            <TimelinePoint icon={Calendar} label="Expiry Date" value={formatDate(product.expiryDate)} />
          </div>
        </div>
      </div>
    </div>
  )
}

function TimelinePoint({ icon: Icon, label, value, active }) {
  return (
    <div className="flex min-w-[128px] flex-col items-center rounded-xl border border-navy-100 px-3 py-3 text-center dark:border-navy-700">
      <div
        className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full ${
          active ? 'bg-emerald-600 text-white' : 'bg-navy-50 text-navy-400 dark:bg-navy-700'
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-[11px] uppercase tracking-wide text-navy-400">{label}</p>
      <p className="text-xs font-semibold text-navy-800 dark:text-navy-100">{value}</p>
    </div>
  )
}

function TimelineConnector() {
  return <div className="h-px w-8 shrink-0 bg-navy-200 dark:bg-navy-700" />
}
