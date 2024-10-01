<template>
  <div class="product-list">
    <!-- Exibe o título recebido via props -->
    <h2 class="product-list__title">{{ title }}</h2>

    <!-- Grid de produtos -->
    <div class="product-list__grid">
      <CoProductCard
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CoProductCard from '@/components/molecules/CoProductCard/CoProductCard.vue';
import { defineProps } from 'vue';

const props = defineProps<{
  products: { name: string; image: string; rating: number; newPrice: number; oldPrice?: number; discount?: number }[];
  title: string;
}>();
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
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}
</style>
