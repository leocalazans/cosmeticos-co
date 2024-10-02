<template>
  <div class="home">
    <CoBanner backgroundImage="/assets/banner.png" />
    <h1>descubra as fragâncias que combinam com você</h1>
    <CoProductList :products="featuredProducts" />
  </div>
</template>

<script setup lang="ts">
import CoProductList from '@/components/organisms/CoProductList/CoProductList.vue'
import CoBanner from '@/components/organisms/CoBanner/CoBanner.vue'
import { ref } from 'vue'

// Lista de produtos destacados
const featuredProducts = ref([
  {
    id: 1,
    name: 'Batom Matte',
    image: 'https://via.placeholder.com/150?text=Batom',
    rating: 5,
    newPrice: 210,
    oldPrice: 230
  },
  {
    id: 2,
    name: 'Perfume XYZ',
    image: 'https://via.placeholder.com/150?text=Perfume',
    rating: 4.8,
    newPrice: 320,
    oldPrice: 350
  },
  {
    id: 3,
    name: 'Creme Hidratante',
    image: 'https://via.placeholder.com/150?text=Creme',
    rating: 4.2,
    newPrice: 50,
    oldPrice: 60
  },
  {
    id: 3,
    name: 'Sabonete',
    image: 'https://via.placeholder.com/150?text=Creme',
    rating: 4.2,
    newPrice: 50,
    oldPrice: 60
  }
])
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
