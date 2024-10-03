<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CoSearchBar from '@/components/molecules/CoSearchBar/CoSearchBar.vue'
import CoHeaderNav from '@/components/molecules/CoHeaderNav/CoHeaderNav.vue'
import CoCart from '../CoCart/CoCart.vue'
import CoAccount from '../CoAccount/CoAccount.vue'

const isTopBarVisible = ref(true)
const toggleTopBar = () => (isTopBarVisible.value = !isTopBarVisible.value)

const router = useRouter()

const goToProducts = () => router.push('/produtos')

const goToHome = () => router.push('/')
</script>

<template>
  <header class="header">
    <div class="header__topbar" v-if="isTopBarVisible">
      <a href="#" class="header__topbar-link" @click.prevent="goToProducts"
        >Aproveite as nossas oportunidades !!!</a
      >
      <button class="header__topbar-close" @click="toggleTopBar">x</button>
    </div>

    <div class="header__container">
      <div class="header__logo">
        <a @click.prevent="goToHome">
          <img src="@/assets/logo.png" alt="Logo da Co" />
        </a>
      </div>

      <CoHeaderNav />

      <CoSearchBar />

      <div class="header__buttons">
        <CoCart />
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
  background-color: #4e4e4e;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
}

.header__topbar-link {
  color: #fff;
  font: 1em serif;
  letter-spacing: 1.5px;
  width: 100%;
  text-align: center;
}

.header__topbar-close {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  width: 10%;
}

.header__topbar-link:hover {
  background: none;
  text-decoration: underline;
}

.header__container {
  width: 100%;
  padding: 25px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__logo img {
  max-width: 100%;
  /* min-height: 60px; */
  height: auto;
  cursor: pointer;
}

.header__buttons {
  display: flex;
  align-items: center;
}
@media (max-width: 768px) {
  .header__container {
    flex-direction: column;
  }
}
</style>
