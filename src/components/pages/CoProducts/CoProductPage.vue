<template>
  <section class="product-page">
    <div v-if="loading" class="product-page__loading-skeleton">
      <!-- Skeleton do banner -->
      <div class="skeleton skeleton-banner"></div>
      <!-- Skeleton das informações do produto -->
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-price"></div>
    </div>

    <div v-else-if="product" class="product-page__content">
      <div class="product-page__banner" :style="{ backgroundImage: `url(${product.image})` }">
        <div class="product-page__card-info">
          <h1 class="product-page__name">{{ product.name }}</h1>
          <p class="product-page__description">{{ product.description }}</p>
          <div class="product-card__contentStars">
            <span
              v-for="n in Math.floor(Number(product.rating) || 0)"
              :key="n"
              class="material-icons"
            >
              {{ n <= Math.floor(product.rating || 0) ? 'star' : 'star_border' }}
            </span>
          </div>
          <p v-if="product.oldPrice" class="product-page__content-price">
            De:
            <span class="product-page__old-price">R${{ product.oldPrice.toFixed(2) }} </span>
            <br />
            Para:
            <span class="product-page__new-price"> R${{ product.newPrice.toFixed(2) }}</span>
          </p>
          <button class="product-page__add-to-cart-btn" @click="addToCart">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>

    <p v-else class="product-page__loading">Produto não encontrado.</p>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia' // Importando o storeToRefs
import { useProductPageStore } from '@/stores/productPageStore'
import { useCartStore } from '@/stores/cartStore'

const productPageStore = useProductPageStore()
const cartStore = useCartStore()
const route = useRoute()

// Utilizando storeToRefs para desestruturar o estado da store
const { product, loading } = storeToRefs(productPageStore)

onMounted(() => {
  const productId = String(route.params.id)
  productPageStore.fetchProductById(productId)
})

const addToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value)
  } else {
    alert('Produto não disponível!')
  }
}

onBeforeUnmount(() => {
  productPageStore.clearProduct()
})
</script>

<style scoped>
.product-page__loading-skeleton {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skeleton {
  background-color: #e0e0e0;
  border-radius: 4px;
}

.skeleton-banner {
  width: 100%;
  height: 200px;
}

.skeleton-text {
  height: 20px;
  width: 80%;
}

.skeleton-price {
  height: 30px;
  width: 50%;
}

.product-page {
  text-align: center;
}

.product-page__banner {
  background-size: cover;
  background-position: center;
  padding: 20px;
  margin-bottom: 20px;
  color: white;
  min-height: 60vh;
  display: flex;
  justify-content: flex-end;
}

.product-page__card-info {
  background-color: rgb(255, 255, 255);
  padding: 20px;
  width: 50%;
  height: 70%;
  margin-bottom: -200px;
  text-align: left;
}

.product-page__name {
  font-size: 32px;
  margin-bottom: 10px;
  color: #000;
  font-weight: bold;
}
.product-page__content-price,
.product-page__rating,
.product-page__new-price,
.product-page__old-price {
  margin: 5px 0;
  font-size: 18px;
  color: #000;
  font-family: 'Roboto', Arial;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.38px;
}
.product-page__old-price {
  font-weight: bold;
  color: #999;
  text-decoration: line-through;
}

.product-page__new-price {
  color: #f48646;
  font-size: 24px;
  font-weight: bolder;
}

.product-card__contentStars {
  display: flex;
}

.product-page__description {
  font-size: 12px;
  font-family: 'Roboto', Arial;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.38px;
  color: #737373;
}
.material-icons {
  font-size: 18px;
  color: #ffc633;
}

.product-page__loading {
  font-size: 18px;
  color: gray;
}

.product-page__add-to-cart-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f48646;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Roboto', Arial, sans-serif;
}

.product-page__add-to-cart-btn:hover {
  background-color: #f36d23;
}

.product-page__add-to-cart-btn:active {
  background-color: #d85d1b;
}

.product-page__add-to-cart-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}
</style>
