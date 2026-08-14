import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../common/Input'
import Select from '../common/Select'
import Button from '../common/Button'
import { PRODUCT_CATEGORIES } from '../../services/productService'
import { formatDateInput, isBeforeDate } from '../../utils/dateUtils'

const categoryOptions = PRODUCT_CATEGORIES.map((category) => ({ value: category, label: category }))

function buildInitialState(product) {
  return {
    name: product?.name || '',
    category: product?.category || '',
    batchNumber: product?.batchNumber || '',
    quantity: product?.quantity ?? '',
    purchaseDate: formatDateInput(product?.purchaseDate) || '',
    expiryDate: formatDateInput(product?.expiryDate) || '',
    supplier: product?.supplier || '',
    description: product?.description || ''
  }
}

export default function ProductForm({ initialProduct, onSubmit, submitLabel, isSubmitting }) {
  const navigate = useNavigate()
  const [values, setValues] = useState(() => buildInitialState(initialProduct))
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')

  function update(key, value) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: '' }))
  }

  function validate() {
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Product name required.'
    if (!values.category) nextErrors.category = 'Category required.'
    if (!values.batchNumber.trim()) nextErrors.batchNumber = 'Batch number required.'
    if (values.quantity === '' || Number(values.quantity) < 0) {
      nextErrors.quantity = 'Quantity must be greater than or equal to zero.'
    }
    if (!values.purchaseDate) nextErrors.purchaseDate = 'Purchase date required.'
    if (!values.expiryDate) nextErrors.expiryDate = 'Expiry date required.'
    if (values.purchaseDate && values.expiryDate && isBeforeDate(values.expiryDate, values.purchaseDate)) {
      nextErrors.expiryDate = 'Expiry date cannot be before purchase date.'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setFormError('')
    if (!validate()) return
    try {
      await onSubmit(values)
    } catch (error) {
      setFormError(error.message || 'Invalid product information.')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {formError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {formError}
        </div>
      )}

      <section>
        <h3 className="text-sm font-semibold text-navy-800 dark:text-navy-100">Product Information</h3>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Product Name"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            error={errors.name}
            required
          />
          <Select
            label="Category"
            placeholder="Select category"
            options={categoryOptions}
            value={values.category}
            onChange={(event) => update('category', event.target.value)}
            error={errors.category}
            required
          />
          <Input
            label="Batch / Lot Number"
            value={values.batchNumber}
            onChange={(event) => update('batchNumber', event.target.value)}
            error={errors.batchNumber}
            required
          />
          <Input
            label="Quantity"
            type="number"
            min="0"
            value={values.quantity}
            onChange={(event) => update('quantity', event.target.value)}
            error={errors.quantity}
            required
          />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-navy-800 dark:text-navy-100">Purchase Information</h3>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Purchase Date"
            type="date"
            value={values.purchaseDate}
            onChange={(event) => update('purchaseDate', event.target.value)}
            error={errors.purchaseDate}
            required
          />
          <Input
            label="Expiry Date"
            type="date"
            value={values.expiryDate}
            onChange={(event) => update('expiryDate', event.target.value)}
            error={errors.expiryDate}
            required
          />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-navy-800 dark:text-navy-100">Additional Details (Optional)</h3>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Supplier"
            value={values.supplier}
            onChange={(event) => update('supplier', event.target.value)}
          />
          <Input
            label="Description"
            value={values.description}
            onChange={(event) => update('description', event.target.value)}
          />
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 border-t border-navy-100 pt-5 sm:flex-row sm:justify-end dark:border-navy-700">
        <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
