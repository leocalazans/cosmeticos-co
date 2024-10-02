<template>
  <section class="container mx-auto px-4">
    <div class="product-list">
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
import { ref, onMounted } from 'vue'
import { ProductService } from '@/services/ProductService'
import { Product } from '@/entities/Product'
import CoProductCard from '@/components/molecules/CoProductCard/CoProductCard.vue'
import { defineEmits } from 'vue'

// Definindo props, se necessário
const emit = defineEmits(['loadMoreProducts'])

const products = ref<Product[]>([])
const productService = new ProductService()
const limit = 4 // Número de produtos a carregar por vez
const skip = ref(0) // Controla o número de produtos já carregados

const fetchProducts = async (skip: number) => {
  try {
    const newProducts = await productService.fetchProducts(skip.value, limit)
    products.value.push(...newProducts) // Adiciona os novos produtos ao array existente
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
  }
}

onMounted(() => fetchProducts(skip.value)) // Carrega os produtos iniciais

const loadMore = () => {
  skip.value += limit // Aumenta o skip em 4
  fetchProducts(skip.value) // Carrega mais produtos
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
