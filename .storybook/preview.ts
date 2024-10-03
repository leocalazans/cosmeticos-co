import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3' // Use `setup` ao invés de `app`
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import 'material-icons/iconfont/material-icons.css'

// Função para configurar o Storybook antes de carregar as histórias
setup((app) => {
  // Inicialize o Pinia
  const pinia = createPinia()
  app.use(pinia)

  // Inicialize o Vue Router com uma rota de exemplo
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/product/:id', name: 'Product', component: { template: '<div>Product</div>' } }
    ]
  })
  app.use(router)
})

// Parâmetros globais do Storybook
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
