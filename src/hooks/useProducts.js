import { useCallback, useEffect, useState } from 'react'
import * as productService from '../services/productService'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await productService.getProducts()
      setProducts(data)
    } catch (err) {
      setError('Unable to load products.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  return { products, isLoading, error, refresh: loadProducts }
}
