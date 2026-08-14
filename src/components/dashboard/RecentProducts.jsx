import { Link } from 'react-router-dom'
import ProductStatusBadge from '../products/ProductStatusBadge'
import { formatDate } from '../../utils/dateUtils'
import { getExpiryStatus } from '../../utils/expiryUtils'

export default function RecentProducts({ products }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-navy-900 dark:text-navy-50">Recently Added Products</h3>
        <Link to="/products" className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400">
          View all
        </Link>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-navy-100 text-xs uppercase tracking-wide text-navy-400 dark:border-navy-700">
              <th className="pb-2 pr-4 font-medium">Product</th>
              <th className="pb-2 pr-4 font-medium">Category</th>
              <th className="pb-2 pr-4 font-medium">Quantity</th>
              <th className="pb-2 pr-4 font-medium">Expiry Date</th>
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
                <td className="py-3 pr-4 text-navy-500 dark:text-navy-400">{product.category}</td>
                <td className="py-3 pr-4 text-navy-500 dark:text-navy-400">{product.quantity}</td>
                <td className="py-3 pr-4 text-navy-500 dark:text-navy-400">{formatDate(product.expiryDate)}</td>
                <td className="py-3">
                  <ProductStatusBadge status={getExpiryStatus(product.expiryDate)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
