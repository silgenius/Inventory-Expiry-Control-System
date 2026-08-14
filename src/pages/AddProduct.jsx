import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../components/products/ProductForm'
import { useToast } from '../hooks/useToast'
import * as productService from '../services/productService'

export default function AddProduct() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(values) {
    setIsSubmitting(true)
    try {
      await productService.createProduct(values)
      showToast('Product added successfully.')
      navigate('/products')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h2 className="text-lg font-bold text-navy-900 dark:text-navy-50">Add New Product</h2>
        <p className="mt-0.5 text-sm text-navy-500 dark:text-navy-400">
          Register a new product and set its expiry information.
        </p>
      </div>
      <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-700 dark:bg-navy-800 sm:p-6">
        <ProductForm onSubmit={handleSubmit} submitLabel="Save Product" isSubmitting={isSubmitting} />
      </div>
    </div>
  )
}
