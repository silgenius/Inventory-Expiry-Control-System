import { useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import ProductFilters from '../components/products/ProductFilters'
import ProductTable from '../components/products/ProductTable'
import ProductCard from '../components/products/ProductCard'
import Pagination from '../components/common/Pagination'
import EmptyState from '../components/common/EmptyState'
import LoadingSpinner from '../components/common/LoadingSpinner'
import Modal from '../components/common/Modal'
import Button from '../components/common/Button'
import { useToast } from '../hooks/useToast'
import * as productService from '../services/productService'
import { getDaysRemaining, getExpiryStatus, sortByUrgency } from '../utils/expiryUtils'

const PAGE_SIZE = 8

const initialFilters = { search: '', category: '', status: '', sort: 'urgency' }

export default function Products() {
  const { products, isLoading, refresh } = useProducts()
  const { showToast } = useToast()
  const [filters, setFilters] = useState(initialFilters)
  const [page, setPage] = useState(1)
  const [productToDelete, setProductToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (filters.search.trim()) {
      const query = filters.search.trim().toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.batchNumber.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      )
    }

    if (filters.category) {
      result = result.filter((product) => product.category === filters.category)
    }

    if (filters.status) {
      result = result.filter((product) => getExpiryStatus(product.expiryDate) === filters.status)
    }

    switch (filters.sort) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'expiryDate':
        result.sort((a, b) => (a.expiryDate > b.expiryDate ? 1 : -1))
        break
      case 'daysRemaining':
        result.sort((a, b) => getDaysRemaining(a.expiryDate) - getDaysRemaining(b.expiryDate))
        break
      case 'quantity':
        result.sort((a, b) => b.quantity - a.quantity)
        break
      case 'category':
        result.sort((a, b) => a.category.localeCompare(b.category))
        break
      default:
        result = sortByUrgency(result)
    }

    return result
  }, [products, filters])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function handleFilterChange(nextFilters) {
    setFilters(nextFilters)
    setPage(1)
  }

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

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-navy-900 dark:text-navy-50">Products</h2>
        <p className="mt-0.5 text-sm text-navy-500 dark:text-navy-400">
          Manage and monitor all products in your inventory.
        </p>
      </div>

      <ProductFilters filters={filters} onChange={handleFilterChange} />

      {isLoading ? (
        <LoadingSpinner label="Loading products" size="lg" />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No products found."
          description="Try adjusting your search or filters."
        />
      ) : (
        <>
          <ProductTable products={pageProducts} onDeleteRequest={setProductToDelete} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
            {pageProducts.map((product) => (
              <ProductCard key={product.id} product={product} onDeleteRequest={setProductToDelete} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
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
