// Account.spec.ts
import { mount } from '@vue/test-utils'
import CoAccount from '@/components/organisms/CoAccount/CoAccount.vue' // Ajuste o caminho conforme necessário
import { describe, it, expect, beforeEach } from 'vitest'

describe('CoAccount.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(CoAccount)
  })

  it('should toggle account visibility when the button is clicked', async () => {
    await wrapper.find('.account__button').trigger('click')
    expect(wrapper.find('.account__card').exists()).toBe(true)

    await wrapper.find('.account__button').trigger('click')
    expect(wrapper.find('.account__card').exists()).toBe(false)
  })

  it('should log in the user and display the welcome message', async () => {
    await wrapper.find('.account__button').trigger('click')

    await wrapper.find('#username').setValue('testuser')
    await wrapper.find('#password').setValue('testpass')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Bem-vindo, testuser!')
    expect(wrapper.find('.account__button_exit').text()).toBe('Sair')
  })

  it('should log out the user', async () => {
    // Log in first
    await wrapper.find('.account__button').trigger('click')
    await wrapper.find('#username').setValue('testuser')
    await wrapper.find('#password').setValue('testpass')
    await wrapper.find('form').trigger('submit.prevent')

    // Now log out
    await wrapper.find('.account__button_exit').trigger('click')

    expect(wrapper.text()).not.toContain('Bem-vindo, testuser!')
    expect(wrapper.find('#username').exists()).toBe(true)
  })
})
