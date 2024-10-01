<template>
  <router-link :to="`/product/${product.id}`" class="product-card">
    <img :src="product.image" :alt="product.name" class="product-card__image" />
    <h3 class="product-card__name">{{ product.name }}</h3>

    <div class="product-card__assessment">
      <div class="product-card__contentStars">
        <span v-for="n in 5" :key="n" class="material-icons">
          {{ n <= Math.floor(product.rating || 0) ? 'star' : 'star_border' }}
        </span>
      </div>

      <div class="assessment">
        <span class="current__assessment">{{ (product.rating || 0).toFixed(1) }} / 5</span>
      </div>
    </div>

    <div class="product-card__prices">
      <div v-if="product.oldPrice" class="oldPrice background-gray">
        R${{ (product.oldPrice || 0).toFixed(2) }}
      </div>
      <div class="newPrice background-gray">
        R${{ (product.newPrice || 0).toFixed(2) }}
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  product: {
    id: number;
    name: string;
    image: string;
    rating?: number;
    newPrice: number;
    oldPrice?: number;
  };
}>();
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  display: block;
  color: inherit;
  text-decoration: none;
}
.product-card__image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
.material-icons {
  font-size: 24px;
  color: #FFC633;
}
.product-card__contentStars {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}
.current__assessment {
  font-weight: bold;
}
</style>
