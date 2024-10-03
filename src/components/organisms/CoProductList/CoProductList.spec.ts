import { mount } from '@vue/test-utils'
import CoProductList from '@/components/organisms/CoProductList/CoProductList.vue'
import { ProductService } from '@/services/ProductService'
import { describe, it, expect, beforeEach, vi } from 'vitest'

vi.mock('@/services/ProductService', () => {
  return {
    ProductService: vi.fn().mockImplementation(() => {
      return {
        fetchProducts: vi.fn().mockResolvedValue([])
      }
    })
  }
})

describe('CoProductList.vue', () => {
  let wrapper: any
  const productService = new ProductService()

  beforeEach(() => {
    wrapper = mount(CoProductList, {
      global: {
        provide: {
          productService
        }
      }
    })
  })

  it('renders no products initially', () => {
    expect(wrapper.findAllComponents({ name: 'CoProductCard' })).toHaveLength(0)
  })
})
