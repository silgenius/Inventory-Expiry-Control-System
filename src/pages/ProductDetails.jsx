import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2, PackageX } from 'lucide-react'
import { useProduct } from '../hooks/useProduct'
import ProductDetailsCard from '../components/products/ProductDetailsCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import EmptyState from '../components/common/EmptyState'
import Modal from '../components/common/Modal'
import Button from '../components/common/Button'
import { useToast } from '../hooks/useToast'
import * as productService from '../services/productService'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { product, isLoading, error } = useProduct(id)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    try {
      await productService.deleteProduct(id)
      showToast('Product deleted successfully.')
      navigate('/products')
    } catch (err) {
      showToast(err.message || 'Product could not be deleted.', 'error')
    } finally {
      setIsDeleting(false)
      setShowDeleteModal(false)
    }
  }

  if (isLoading) return <LoadingSpinner label="Loading product details" size="lg" />
  if (error || !product) {
    return <EmptyState icon={PackageX} title="Product not found" description={error} />
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-800 dark:text-navy-400 dark:hover:text-navy-100">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-navy-900 dark:text-navy-50">{product.name}</h2>
          <p className="mt-0.5 text-sm text-navy-500 dark:text-navy-400">Batch {product.batchNumber} · {product.category}</p>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/products/${id}/edit`}
            className="inline-flex items-center gap-2 rounded-xl border border-navy-200 px-4 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50 dark:border-navy-700 dark:text-navy-100 dark:hover:bg-navy-700"
          >
            <Pencil className="h-4 w-4" /> Edit Product
          </Link>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>

      <ProductDetailsCard product={product} />

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Product?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
              Delete
            </Button>
          </>
        }
      >
        Are you sure you want to delete {product.name}? This action cannot be undone.
      </Modal>
    </div>
  )
}
