<template>
  <section class="container mx-auto px-4">
    <div class="product-list">
      <!-- Exibe o título recebido via props -->
      <h2 class="product-list__title">{{ title }}</h2>

      <!-- Grid de produtos -->
      <div class="product-list__grid">
        <CoProductCard v-for="(product, index) in products" :key="index" :product="product" />
      </div>

      <!-- Botão de carregar mais produtos -->
      <div class="product-list__load-more">
        <button @click="loadMore" class="product-list__button">Carregar outros</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CoProductCard from '@/components/molecules/CoProductCard/CoProductCard.vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  products: {
    name: string
    image: string
    rating: number
    newPrice: number
    oldPrice?: number
    discount?: number
  }[]
  title: string
}>()

const emit = defineEmits(['loadMoreProducts'])

// Função que emite o evento para carregar mais produtos
const loadMore = () => {
  emit('loadMoreProducts')
}
</script>

<style scoped>
.product-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
}

.product-list__title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  text-align: center;
}

.product-list__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Padrão para celular (2 colunas) */
  gap: 30px;
}

@media (min-width: 768px) {
  /* Para telas de tablet (3 colunas) */
  .product-list__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  /* Para telas de desktop (4 colunas) */
  .product-list__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.product-list__load-more {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.product-list__button {
  border: solid 1px;
  border-radius: 15px;
  background: #ffff;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.product-list__button:hover {
  background-color: #f0f0f0;
}
</style>
