import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'
import ProductForm from '../components/products/ProductForm'
import LoadingSpinner from '../components/common/LoadingSpinner'
import EmptyState from '../components/common/EmptyState'
import { PackageX } from 'lucide-react'
import { useToast } from '../hooks/useToast'
import * as productService from '../services/productService'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { product, isLoading, error } = useProduct(id)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(values) {
    setIsSubmitting(true)
    try {
      await productService.updateProduct(id, values)
      showToast('Product updated successfully.')
      navigate(`/products/${id}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <LoadingSpinner label="Loading product" size="lg" />
  if (error || !product) {
    return <EmptyState icon={PackageX} title="Product not found" description={error} />
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h2 className="text-lg font-bold text-navy-900 dark:text-navy-50">Edit Product</h2>
        <p className="mt-0.5 text-sm text-navy-500 dark:text-navy-400">Update {product.name}&apos;s details.</p>
      </div>
      <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:p-6">
        <ProductForm
          initialProduct={product}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  )
}
