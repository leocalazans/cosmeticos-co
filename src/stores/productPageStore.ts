// src/stores/productPageStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ProductService } from '@/services/ProductService'

import type { Product } from '@/interfaces/product'

const isValidProduct = (obj: any): obj is Product => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.image === 'string' &&
    typeof obj.description === 'string' &&
    (typeof obj.oldPrice === 'number' || obj.oldPrice === undefined) &&
    typeof obj.newPrice === 'number' &&
    (typeof obj.rating === 'number' || obj.rating === undefined)
  )
}

export const useProductPageStore = defineStore('productPage', () => {
  const product = ref<Product | null>(null)
  const loading = ref(true)
  const productService = new ProductService()

  const fetchProductById = async (id: string) => {
    loading.value = true
    try {
      const fetchedProduct = await productService.fetchProductById(id)
      if (isValidProduct(fetchedProduct)) {
        product.value = fetchedProduct
      } else {
        throw new Error('Produto inválido')
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error)
    } finally {
      loading.value = false
    }
  }
  const clearProduct = () => {
    product.value = null
  }
  return { product, loading, fetchProductById, clearProduct }
})
