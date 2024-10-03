// src/components/ProductCard.spec.ts
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/molecules/CoProductCard/CoProductCard.vue' // Ajuste o caminho conforme necessário
import { describe, it, expect } from 'vitest'

describe('ProductCard.vue', () => {
  it('renders product information correctly', () => {
    // Dados simulados do produto
    const product = {
      id: 1,
      name: 'Produto Teste',
      image: 'http://example.com/image.jpg',
      rating: 4.5,
      newPrice: 99.99,
      oldPrice: 129.99
    }

    // Monta o componente com as props
    const wrapper = mount(ProductCard, {
      props: { product }
    })

    // Verifica se a imagem é renderizada corretamente
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(product.image)
    expect(img.attributes('alt')).toBe(product.name)

    // Verifica se o nome do produto é renderizado
    const name = wrapper.find('.product-card__name')
    expect(name.text()).toBe(product.name)

    // Verifica se a avaliação é renderizada corretamente
    const stars = wrapper.findAll('.material-icons')
    expect(stars.length).toBe(Math.floor(product.rating))
    expect(stars[0].text()).toBe('star') // Verifica se as estrelas são exibidas

    // Verifica se os preços são exibidos corretamente
    const newPrice = wrapper.find('.product-card__price--new')
    expect(newPrice.text()).toContain(`R$${product.newPrice.toFixed(2)}`)

    const oldPrice = wrapper.find('.product-card__price--old')
    expect(oldPrice.exists()).toBe(true)
    expect(oldPrice.text()).toContain(`R$${product.oldPrice?.toFixed(2)}`)

    // Verifica se o tooltip de desconto é exibido
    const tooltip = wrapper.find('.product-card__tooltip')
    expect(tooltip.exists()).toBe(true)
    expect(tooltip.text()).toBe(
      `-${Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)}%`
    )

    // Verifica se o router-link redireciona para o produto correto
    const link = wrapper.find('router-link')
    expect(link.attributes('to')).toBe(`/product/${product.id}`)
  })
})
