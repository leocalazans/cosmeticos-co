<template>
  <div class="cart__container" role="complementary">
    <button class="cart__button" @click="toggleCart" aria-label="Toggle cart">
      <span class="material-icons-outlined text-4xl"> shopping_cart </span>
      <span class="cart__button-quantity" v-if="items.length">{{ items.length }}</span>
    </button>

    <div class="cart" v-if="isCartVisible" aria-labelledby="cart-title">
      <div class="cart__card">
        <h2 id="cart-title" class="visually-hidden">Carrinho de Compras</h2>
        <ul class="cart__list">
          <li v-for="(item, index) in items" :key="index" class="cart__item" role="listitem">
            <img :src="item.image" :alt="item.name" class="cart__item-image" />
            <span class="cart__item-name">{{ item.name }}</span>
            <span class="cart__item-remove" @click="removeItem(index)" aria-label="Remove item"
              >x</span
            >
          </li>
        </ul>
      </div>
      <div v-if="isCartVisible && !items.length" class="cart__empty-message" aria-live="polite">
        <span>Carrinho vazio</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'

const isCartVisible = ref(false)

const cartStore = useCartStore()
const { items } = storeToRefs(cartStore)

const toggleCart = () => {
  isCartVisible.value = !isCartVisible.value
}

const removeItem = (index: number) => {
  cartStore.removeItem(index)
}

const handleClickOutside = (event: MouseEvent) => {
  const cart = document.querySelector('.cart')
  const button = document.querySelector('.cart__button')

  if (
    cart &&
    button &&
    !cart.contains(event.target as Node) &&
    !button.contains(event.target as Node)
  ) {
    isCartVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.cart__container {
  position: relative;
}

.cart {
  top: 130%;
  position: absolute;
  right: 0px;
  width: 210px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.cart__button {
  width: 48px;
  height: 48px;
  padding: 10px;
  text-align: center;
  position: relative;
  cursor: pointer;
  border: none;
  background-color: transparent;
}

.cart__button:hover {
  transform: scale(1.1);
}

.cart__button-quantity {
  position: absolute;
  bottom: 8px;
  right: 4px;
  background-color: rgba(0, 0, 0, 0.596);
  color: white;
  font-size: 9px;
  padding: 1px 5px;
  border-radius: 100%;
  font-weight: bold;
}

.cart__card {
  padding: 10px;
}

.cart__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.cart__item-image {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
}

.cart__item-name {
  flex-grow: 1;
  margin-left: 10px;
}

.cart__item-remove {
  cursor: pointer;
  color: #000;
  font-weight: thin;
}

.cart__item-remove:hover {
  color: darkred;
}

.cart__empty-message {
  padding: 10px;
  text-align: center;
  color: #888;
}
</style>
