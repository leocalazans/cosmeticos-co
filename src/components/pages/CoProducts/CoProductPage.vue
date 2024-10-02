<template>
    <section class="product-page">
      <h1>{{ product.name }}</h1>
      <img :src="product.image" :alt="product.name" />
      <p>Avaliação: {{ product.rating }} / 5</p>
      <p>Preço atual: R${{ product.newPrice.toFixed(2) }}</p>
      <p v-if="product.oldPrice">Preço antigo: R${{ product.oldPrice.toFixed(2) }}</p>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const product = ref({
    id: 0,
    name: '',
    image: '',
    rating: 0,
    newPrice: 0,
    oldPrice: 0
  });
  
  // Simular a busca de produto (normalmente viria de uma API)
  const products = [
    { id: 1, name: 'Batom Matte', image: 'https://via.placeholder.com/150?text=Batom', rating: 4.5, newPrice: 210, oldPrice: 230 },
    { id: 2, name: 'Perfume XYZ', image: 'https://via.placeholder.com/150?text=Perfume', rating: 4.8, newPrice: 320, oldPrice: 350 },
    { id: 3, name: 'Creme Hidratante', image: 'https://via.placeholder.com/150?text=Creme', rating: 4.2, newPrice: 50, oldPrice: 60 }
  ];
  
  onMounted(() => {
    const productId = Number(route.params.id);
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      product.value = foundProduct;
    }
  });
  </script>
  
  <style scoped>
  .product-page {
    text-align: center;
  }
  .product-page img {
    max-width: 300px;
    border-radius: 8px;
  }
  
  </style>
