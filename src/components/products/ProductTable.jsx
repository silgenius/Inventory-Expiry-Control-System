import { Link } from 'react-router-dom'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import ProductStatusBadge from './ProductStatusBadge'
import { formatDate } from '../../utils/dateUtils'
import { getDaysRemainingLabel, getExpiryStatus } from '../../utils/expiryUtils'

export default function ProductTable({ products, onDeleteRequest }) {
  return (
    <div className="hidden overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-card md:block dark:border-navy-700 dark:bg-navy-800">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="border-b border-navy-100 bg-navy-50/60 text-xs uppercase tracking-wide text-navy-400 dark:border-navy-700 dark:bg-navy-900/40">
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Batch No.</th>
            <th className="px-4 py-3 font-medium">Quantity</th>
            <th className="px-4 py-3 font-medium">Purchase Date</th>
            <th className="px-4 py-3 font-medium">Expiry Date</th>
            <th className="px-4 py-3 font-medium">Days Remaining</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-navy-50 last:border-0 hover:bg-navy-50/40 dark:border-navy-700/60 dark:hover:bg-navy-700/30">
              <td className="px-4 py-3 font-medium text-navy-800 dark:text-navy-100">
                <Link to={`/products/${product.id}`} className="hover:text-emerald-700 dark:hover:text-emerald-400">
                  {product.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-navy-500 dark:text-navy-400">{product.category}</td>
              <td className="px-4 py-3 text-navy-500 dark:text-navy-400">{product.batchNumber}</td>
              <td className="px-4 py-3 text-navy-500 dark:text-navy-400">{product.quantity}</td>
              <td className="px-4 py-3 text-navy-500 dark:text-navy-400">{formatDate(product.purchaseDate)}</td>
              <td className="px-4 py-3 text-navy-500 dark:text-navy-400">{formatDate(product.expiryDate)}</td>
              <td className="px-4 py-3 font-medium text-navy-700 dark:text-navy-200">
                {getDaysRemainingLabel(product.expiryDate)}
              </td>
              <td className="px-4 py-3">
                <ProductStatusBadge status={getExpiryStatus(product.expiryDate)} />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    to={`/products/${product.id}`}
                    aria-label={`View ${product.name}`}
                    className="rounded-lg p-1.5 text-navy-400 hover:bg-navy-100 hover:text-navy-700 dark:hover:bg-navy-700"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link
                    to={`/products/${product.id}/edit`}
                    aria-label={`Edit ${product.name}`}
                    className="rounded-lg p-1.5 text-navy-400 hover:bg-navy-100 hover:text-navy-700 dark:hover:bg-navy-700"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    aria-label={`Delete ${product.name}`}
                    onClick={() => onDeleteRequest(product)}
                    className="rounded-lg p-1.5 text-navy-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
