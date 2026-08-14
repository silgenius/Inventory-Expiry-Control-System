import { Link } from 'react-router-dom'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import ProductStatusBadge from './ProductStatusBadge'
import { formatDate } from '../../utils/dateUtils'
import { getDaysRemainingLabel, getExpiryStatus } from '../../utils/expiryUtils'

export default function ProductCard({ product, onDeleteRequest }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-card md:hidden dark:border-navy-700 dark:bg-navy-800">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link to={`/products/${product.id}`} className="text-sm font-semibold text-navy-900 hover:text-emerald-700 dark:text-navy-50 dark:hover:text-emerald-400">
            {product.name}
          </Link>
          <p className="mt-0.5 text-xs text-navy-500 dark:text-navy-400">
            {product.category} · Batch {product.batchNumber}
          </p>
        </div>
        <ProductStatusBadge status={getExpiryStatus(product.expiryDate)} />
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
        <div>
          <dt className="text-navy-400">Quantity</dt>
          <dd className="font-medium text-navy-700 dark:text-navy-200">{product.quantity}</dd>
        </div>
        <div>
          <dt className="text-navy-400">Expiry Date</dt>
          <dd className="font-medium text-navy-700 dark:text-navy-200">{formatDate(product.expiryDate)}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-navy-400">Days Remaining</dt>
          <dd className="font-semibold text-navy-800 dark:text-navy-100">{getDaysRemainingLabel(product.expiryDate)}</dd>
        </div>
      </dl>
      <div className="mt-3 flex items-center gap-2 border-t border-navy-100 pt-3 dark:border-navy-700">
        <Link
          to={`/products/${product.id}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy-200 py-1.5 text-xs font-medium text-navy-600 dark:border-navy-700 dark:text-navy-300"
        >
          <Eye className="h-3.5 w-3.5" /> View
        </Link>
        <Link
          to={`/products/${product.id}/edit`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy-200 py-1.5 text-xs font-medium text-navy-600 dark:border-navy-700 dark:text-navy-300"
        >
          <Pencil className="h-3.5 w-3.5" /> Edit
        </Link>
        <button
          type="button"
          onClick={() => onDeleteRequest(product)}
          aria-label={`Delete ${product.name}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 py-1.5 text-xs font-medium text-red-600 dark:border-red-900"
        >
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </button>
      </div>
    </div>
  )
}
