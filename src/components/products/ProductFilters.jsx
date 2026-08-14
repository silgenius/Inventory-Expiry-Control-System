import { Search, PackagePlus } from 'lucide-react'
import Input from '../common/Input'
import Select from '../common/Select'
import { PRODUCT_CATEGORIES } from '../../services/productService'
import { EXPIRY_STATUS, getStatusLabel } from '../../utils/expiryUtils'
import { Link } from 'react-router-dom'

const categoryOptions = PRODUCT_CATEGORIES.map((category) => ({ value: category, label: category }))
const statusOptions = Object.values(EXPIRY_STATUS).map((status) => ({ value: status, label: getStatusLabel(status) }))
const sortOptions = [
  { value: 'urgency', label: 'Requires Attention First' },
  { value: 'name', label: 'Product Name' },
  { value: 'expiryDate', label: 'Expiry Date' },
  { value: 'daysRemaining', label: 'Days Remaining' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'category', label: 'Category' }
]

export default function ProductFilters({ filters, onChange }) {
  function update(key, value) {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Input
          icon={Search}
          placeholder="Search name, batch, category"
          value={filters.search}
          onChange={(event) => update('search', event.target.value)}
          aria-label="Search products"
          containerClassName="lg:col-span-2"
        />
        <Select
          placeholder="All Categories"
          options={categoryOptions}
          value={filters.category}
          onChange={(event) => update('category', event.target.value)}
          aria-label="Filter by category"
        />
        <Select
          placeholder="All Statuses"
          options={statusOptions}
          value={filters.status}
          onChange={(event) => update('status', event.target.value)}
          aria-label="Filter by expiry status"
        />
        <Select
          options={sortOptions}
          value={filters.sort}
          onChange={(event) => update('sort', event.target.value)}
          aria-label="Sort products"
        />
      </div>
      <div className="mt-3 flex justify-end">
        <Link
          to="/products/add"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 sm:w-auto"
        >
          <PackagePlus className="h-4 w-4" strokeWidth={2} />
          Add Product
        </Link>
      </div>
    </div>
  )
}
