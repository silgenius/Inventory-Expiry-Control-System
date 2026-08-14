import { useEffect, useMemo, useState } from 'react'
import { Printer, Download } from 'lucide-react'
import Button from '../components/common/Button'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ExpiryChart from '../components/reports/ExpiryChart'
import CategoryChart from '../components/reports/CategoryChart'
import { useProducts } from '../hooks/useProducts'
import { useToast } from '../hooks/useToast'
import * as reportService from '../services/reportService'
import { formatDate } from '../utils/dateUtils'

export default function Reports() {
  const { products, isLoading: productsLoading } = useProducts()
  const { showToast } = useToast()
  const [distribution, setDistribution] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [expiringThisMonth, setExpiringThisMonth] = useState([])
  const [expiredProducts, setExpiredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadReports() {
      setIsLoading(true)
      const [dist, categories, expiring, expired] = await Promise.all([
        reportService.getExpiryStatusDistribution(),
        reportService.getCategoryBreakdown(),
        reportService.getExpiringThisMonth(),
        reportService.getExpiredProducts()
      ])
      setDistribution(dist)
      setCategoryData(categories)
      setExpiringThisMonth(expiring)
      setExpiredProducts(expired)
      setIsLoading(false)
    }
    loadReports()
  }, [])

  const totalQuantity = useMemo(() => products.reduce((sum, item) => sum + Number(item.quantity || 0), 0), [products])

  function handleExport() {
    showToast('Report data prepared. Use Print Report to save as PDF.')
  }

  if (isLoading || productsLoading) return <LoadingSpinner label="Building your reports" size="lg" />

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-navy-900 dark:text-navy-50">Reports</h2>
          <p className="mt-0.5 text-sm text-navy-500 dark:text-navy-400">Inventory and expiry insights for your business.</p>
        </div>
        <div className="flex gap-2 print:hidden">
          <Button variant="secondary" icon={Download} onClick={handleExport}>
            Export Report
          </Button>
          <Button variant="secondary" icon={Printer} onClick={() => window.print()}>
            Print Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryTile label="Total Products" value={products.length} />
        <SummaryTile label="Total Quantity" value={totalQuantity} />
        <SummaryTile label="Expiring This Month" value={expiringThisMonth.length} />
        <SummaryTile label="Expired Products" value={expiredProducts.length} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ExpiryChart data={distribution} />
        <CategoryChart data={categoryData} />
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800">
        <h3 className="text-base font-semibold text-navy-900 dark:text-navy-50">Expired Products</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-xs uppercase tracking-wide text-navy-400 dark:border-navy-700">
                <th className="pb-2 pr-4 font-medium">Product</th>
                <th className="pb-2 pr-4 font-medium">Category</th>
                <th className="pb-2 pr-4 font-medium">Batch</th>
                <th className="pb-2 font-medium">Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {expiredProducts.slice(0, 8).map((product) => (
                <tr key={product.id} className="border-b border-navy-50 last:border-0 dark:border-navy-700/60">
                  <td className="py-2.5 pr-4 font-medium text-navy-800 dark:text-navy-100">{product.name}</td>
                  <td className="py-2.5 pr-4 text-navy-500 dark:text-navy-400">{product.category}</td>
                  <td className="py-2.5 pr-4 text-navy-500 dark:text-navy-400">{product.batchNumber}</td>
                  <td className="py-2.5 text-navy-500 dark:text-navy-400">{formatDate(product.expiryDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {expiredProducts.length === 0 && (
            <p className="py-6 text-center text-sm text-navy-400">No expired products currently.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function SummaryTile({ label, value }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-card dark:border-navy-700 dark:bg-navy-800">
      <p className="text-xs font-medium text-navy-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-navy-900 dark:text-navy-50">{value}</p>
    </div>
  )
}
