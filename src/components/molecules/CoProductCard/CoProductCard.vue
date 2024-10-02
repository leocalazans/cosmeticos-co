<template>
  <router-link :to="`/product/${product.id}`" class="product-card">
    <div class="product-card__image-container">
      <img :src="product.image" :alt="product.name" class="product-card__image" />
    </div>
    <h3 class="product-card__name">{{ product.name }}</h3>

    <div class="product-card__assessment">
      <div class="product-card__contentStars">
        <span v-for="n in Math.floor(Number(product.rating) || 0)" :key="n" class="material-icons">
          {{ n <= Math.floor(product.rating || 0) ? 'star' : 'star_border' }}
        </span>
      </div>

      <div class="product-card__assessment-score">
        <span class="product-card__assessment-score-value"
          >{{ (Number(product.rating) || 0).toFixed(1) }} / 5</span
        >
      </div>
    </div>

    <div class="product-card__prices">
      <div class="product-card__price product-card__price--new">
        R${{ (product.newPrice || 0).toFixed(2) }}
      </div>
      <div v-if="product.oldPrice" class="product-card__price product-card__price--old">
        R${{ (product.oldPrice || 0).toFixed(2) }}
      </div>
      <span v-if="product.oldPrice" class="product-card__tooltip"
        >-{{ calculateDiscount(product.oldPrice, product.newPrice) }}%</span
      >
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  product: {
    id: number
    name: string
    image: string
    rating?: number
    newPrice: number
    oldPrice?: number
  }
}>()

const calculateDiscount = (oldPrice: number | undefined, newPrice: number): number =>
  (oldPrice && Math.round(((oldPrice - newPrice) / oldPrice) * 100)) || 0
</script>

<style scoped>
.product-card {
  width: 100%;
  border-radius: 8px;
  padding: 0;
  text-align: center;
  display: block;
  color: inherit;
  text-decoration: none;
  overflow: hidden; /* Garantir que nada saia do card */
  transition: transform 0.3s ease;
}

.product-card__image-container {
  width: 100%;
  border-radius: 8px;
  overflow: hidden; /* Aplicando o overflow hidden no container da imagem */
}

.product-card__image {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.product-card:hover .product-card__image {
  transform: scale(1.1);
}

.product-card__name {
  font-family: Georgia;
  font-size: 1.6em;
  font-weight: bold;
  color: black;
  text-align: left;
}

.product-card__assessment {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.product-card__contentStars {
  display: flex;
}

.material-icons {
  font-size: 18px;
  color: #ffc633;
}

.product-card__assessment-score {
  padding-left: 5px;
}

.product-card__assessment-score-value {
  font-weight: bold;
  font-family: serif;
  font-size: 1em;
  line-height: 1em;
  color: #000;
}

.product-card__prices {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.product-card__price {
  font-family: Georgia;
  font-size: 1.4em;
  padding: 0 5px;
}

.product-card__price--old {
  font-weight: 900;
  color: #999;
  text-decoration: line-through;
}

.product-card__price--new {
  font-weight: 900;
  color: #000;
}

.product-card__tooltip {
  display: block;
  font-family: sans-serif;
  font-size: 0.8em;
  font-weight: bold;
  background-color: #ffeaea;
  color: #ff5a5a;
  padding: 0px 15px;
  line-height: 2em;
  border-radius: 15px;
  height: 25px;
}
</style>
