// stores/cart.ts
import { defineStore } from 'pinia'

import type { CartItem } from '@/interfaces/cartItem'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),
  actions: {
    addItem(item: CartItem) {
      this.items.push(item)
    },
    removeItem(index: number) {
      this.items.splice(index, 1)
    }
  },
  getters: {
    itemCount: (state) => state.items.length
  }
})
