import { useCallback, useEffect, useState } from 'react'
import * as productService from '../services/productService'

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadProduct = useCallback(async () => {
    if (!id) return
    setIsLoading(true)
    setError(null)
    try {
      const data = await productService.getProductById(id)
      setProduct(data)
    } catch (err) {
      setError(err.message || 'Product could not be found.')
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadProduct()
  }, [loadProduct])

  return { product, isLoading, error, refresh: loadProduct }
}
