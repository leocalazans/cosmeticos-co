import { mount } from '@vue/test-utils'
import Cart from '@/components/organisms/CoCart/CoCart.vue'
import { createPinia } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import { describe, it, expect, beforeEach } from 'vitest'

type WrapperType = ReturnType<typeof mount<Cart>>

describe('CoCart.vue', () => {
  let wrapper: WrapperType
  const pinia = createPinia()

  beforeEach(() => {
    wrapper = mount(Cart, {
      global: {
        plugins: [pinia]
      }
    })
  })

  it('renders the cart button', () => {
    const button = wrapper.find('.cart__button')
    expect(button.exists()).toBe(true)
  })

  it('toggles cart visibility when button is clicked', async () => {
    const button = wrapper.find('.cart__button')
    await button.trigger('click')
    expect(wrapper.vm.isCartVisible).toBe(true)

    await button.trigger('click')
    expect(wrapper.vm.isCartVisible).toBe(false)
  })

  it('displays a message when cart is empty', async () => {
    const button = wrapper.find('.cart__button')
    await button.trigger('click')
    expect(wrapper.find('.cart__empty-message').exists()).toBe(true)
    expect(wrapper.find('.cart__empty-message').text()).toContain('Carrinho vazio')
  })
})
