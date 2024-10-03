<template>
  <div class="home">
    <CoBanner backgroundImage="/assets/banner.png" />
    <h1>descubra as fragâncias que combinam com você</h1>
    <CoProductList />
  </div>
</template>

<script setup lang="ts">
import CoProductList from '@/components/organisms/CoProductList/CoProductList.vue'
import CoBanner from '@/components/organisms/CoBanner/CoBanner.vue'
import { ref } from 'vue'
</script>

<style scoped>
.home {
  padding: 0px;
}
.home h1 {
  color: #000;
  font-family: serif;
  font-weight: bolder;
  text-align: center;
  font-size: 3em;
  margin: 25px 0;
}
</style>
