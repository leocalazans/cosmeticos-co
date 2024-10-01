<script setup lang="ts">
import { ref } from 'vue'
import CoSearchBar from '@/components/molecules/CoSearchBar/CoSearchBar.vue'
import CoHeaderNav from '@/components/molecules/CoHeaderNav/CoHeaderNav.vue';
import CoCart from '../CoCart/CoCart.vue';
import CoAccount from '../CoAccount/CoAccount.vue'; 

interface CartItem {
  name: string;
  image: string;
}

const cartItems = ref<CartItem[]>([
  { name: 'Batom Matte', image: 'https://via.placeholder.com/50?text=Batom' },
  { name: 'Perfume XYZ', image: 'https://via.placeholder.com/50?text=Perfume' },
  { name: 'Creme Hidratante', image: 'https://via.placeholder.com/50?text=Creme' }
])

const handleRemoveItem = (index: number) => {
  cartItems.value.splice(index, 1)
}

const isTopBarVisible = ref(true)

const toggleTopBar = () => {
  isTopBarVisible.value = !isTopBarVisible.value
}
</script>

<template>
  <header class="header">
    <div class="header__topbar" v-if="isTopBarVisible">
      <a href="#" class="header__topbar-link">Aproveite as nossas oportunidades !!!</a>
      <button class="header__topbar-close" @click="toggleTopBar">x</button>
    </div>

    <div class="header__container">
      <div class="header__logo">
        <img src="@/assets/logo.png" alt="Logo da Co">
      </div>

      <CoHeaderNav />

      <CoSearchBar />

      <div class="header__buttons">
        <CoCart :cartItems="cartItems" @remove="handleRemoveItem" />
        <CoAccount /> 
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
}

.header__topbar {
  display: flex;
  background-color: #4E4E4E;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  align-items: center;
}

.header__topbar-link {
  color: #fff;
  font: 1em serif;
  letter-spacing: 1.5px;
  width:100%;
  text-align:center;
}

.header__topbar-close {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  width:10%;
}

.header__topbar-link:hover {
  background:none;
  text-decoration: underline;
}

.header__container {
  width:100%;
  padding: 25px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__logo img {
  height: 60px; 
}

.header__buttons {
  display: flex;
  align-items: center;
}
</style>
