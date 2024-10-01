// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import CoHome from '@/components/pages/CoHome/CoHome.vue';
import CoProducts from '@/components/pages/CoProducts/CoProducts.vue';
import ProductPage from '@/components/pages/CoProducts/CoProductPage.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: CoHome,
  },
  {
    path: '/produtos',
    name: 'Products',
    component: CoProducts,
  },
  {
    path: '/product/:id',
    name: 'ProductPage',
    component: ProductPage,
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
