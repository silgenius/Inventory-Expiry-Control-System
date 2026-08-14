import { Link } from 'react-router-dom'
import ProductStatusBadge from '../products/ProductStatusBadge'
import EmptyState from '../common/EmptyState'
import { ShieldCheck } from 'lucide-react'
import { formatDate } from '../../utils/dateUtils'
import { getDaysRemainingLabel, getExpiryStatus } from '../../utils/expiryUtils'

export default function AttentionTable({ products }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <h3 className="text-base font-semibold text-navy-900 dark:text-navy-50">Products Requiring Immediate Attention</h3>
      <p className="mt-0.5 text-sm text-navy-500 dark:text-navy-400">Sorted by the shortest remaining shelf life.</p>

      {products.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            icon={ShieldCheck}
            title="Nothing needs attention"
            description="No products are currently expiring soon or expired."
          />
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-xs uppercase tracking-wide text-navy-400 dark:border-navy-700">
                <th className="pb-2 pr-4 font-medium">Product</th>
                <th className="pb-2 pr-4 font-medium">Batch</th>
                <th className="pb-2 pr-4 font-medium">Expiry Date</th>
                <th className="pb-2 pr-4 font-medium">Days Remaining</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-navy-50 last:border-0 dark:border-navy-700/60">
                  <td className="py-3 pr-4 font-medium text-navy-800 dark:text-navy-100">
                    <Link to={`/products/${product.id}`} className="hover:text-emerald-700 dark:hover:text-emerald-400">
                      {product.name}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-navy-500 dark:text-navy-400">{product.batchNumber}</td>
                  <td className="py-3 pr-4 text-navy-500 dark:text-navy-400">{formatDate(product.expiryDate)}</td>
                  <td className="py-3 pr-4 font-medium text-navy-700 dark:text-navy-200">
                    {getDaysRemainingLabel(product.expiryDate)}
                  </td>
                  <td className="py-3">
                    <ProductStatusBadge status={getExpiryStatus(product.expiryDate)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
