<template>
  <div class="cart__container">
    <div class="cart__button" @click="toggleCart">
      <span class="material-icons-outlined text-4xl">
        shopping_cart
      </span>
      <span class="cart__button-quantity" v-if="cartItems.length">{{ cartItems.length }}</span>
    </div>
    
    <div class="cart" v-if="isCartVisible">
      <div class="cart__card">
        <ul class="cart__list">
          <li v-for="(item, index) in cartItems" :key="index" class="cart__item">
            <img :src="item.image" :alt="item.name" class="cart__item-image" />
            <span class="cart__item-name">{{ item.name }}</span>
            <span class="cart__item-remove" @click="removeItem(index)">x</span>
          </li>
        </ul>
      </div>
      <div v-if="isCartVisible && !cartItems.length" class="cart__empty-message">
        <span>Carrinho vazio</span>
      </div>
    </div>
  </div>  
</template>
  
<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, onBeforeUnmount } from 'vue'

interface CartItem {
  name: string;
  image: string;
}

const props = defineProps<{
  cartItems: CartItem[];
}>()

const emit = defineEmits<{
  (event: 'remove', index: number): void;
}>()

const isCartVisible = ref(false)

// Função para alternar a visibilidade do carrinho
const toggleCart = () => {
  isCartVisible.value = !isCartVisible.value
}

// Função para remover um item do carrinho
const removeItem = (index: number) => {
  emit('remove', index)
}

// Função para detectar cliques fora do cartão
const handleClickOutside = (event: MouseEvent) => {
  const cart = document.querySelector('.cart')
  const button = document.querySelector('.cart__button')

  if (cart && button && !cart.contains(event.target as Node) && !button.contains(event.target as Node)) {
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
