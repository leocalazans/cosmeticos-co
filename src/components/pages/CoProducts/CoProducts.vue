<template>
    <div class="products">
      <h1>Nossos Produtos</h1>
      <CoProductList :products="allProducts" title="Todos os Produtos" />
    </div>
  </template>
  
  <script setup lang="ts">
  import CoProductList from '@/components/organisms/CoProductList/CoProductList.vue';
  import { ref } from 'vue';
  
  const allProducts = ref([
    { name: 'Batom Matte', image: 'https://via.placeholder.com/150?text=Batom' },
    { name: 'Perfume XYZ', image: 'https://via.placeholder.com/150?text=Perfume' },
    { name: 'Creme Hidratante', image: 'https://via.placeholder.com/150?text=Creme' },
    // Adicione mais produtos conforme necessário
  ]);
  </script>
  
  <style scoped>
  .products {
    padding: 20px;
  }
  </style>
  