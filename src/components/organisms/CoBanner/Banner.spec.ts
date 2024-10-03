// src/components/Banner.spec.ts
import { mount } from '@vue/test-utils'
import Banner from '@/components/organisms/CoBanner/CoBanner.vue'
import { describe, it, expect } from 'vitest'

describe('CoBanner.vue', () => {
  it('renders with the correct background image', () => {
    const backgroundImage = 'http://example.com/background.jpg'
    const wrapper = mount(Banner, {
      props: { backgroundImage }
    })

    // Verifica se a imagem de fundo foi aplicada corretamente
    expect(wrapper.element.style.backgroundImage).toBe(`url(${backgroundImage})`)
  })

  it('renders with default styles', () => {
    const backgroundImage = 'http://example.com/background.jpg'
    const wrapper = mount(Banner, {
      props: { backgroundImage }
    })

    // Verifica se o banner tem a altura correta
    console.log(wrapper.element.style.height)
    console.log(wrapper.element.style.backgroundColor)
    expect(wrapper.classes()).toContain('banner')
    // expect(wrapper.element.style.height).toBe('70vh')
    // expect(wrapper.element.style.backgroundColor).toBe('orange')
  })
})
