<template>
  <section class="container mx-auto px-4">
    <div class="product-list">
      <div class="product-list__grid">
        <CoProductCard v-for="(product, index) in products" :key="index" :product="product" />
      </div>

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

const emit = defineEmits(['loadMoreProducts'])

const products = ref<Product[]>([])
const productService = new ProductService()
const limit = 4
const skip = ref(0)

const fetchProducts = async (skipValue: number) => {
  try {
    const newProducts = await productService.fetchProducts(skipValue, limit)
    products.value.push(...newProducts)
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
  }
}

onMounted(() => fetchProducts(skip.value))

const loadMore = () => {
  skip.value += limit
  fetchProducts(skip.value)
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
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

@media (min-width: 768px) {
  .product-list__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
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
