<template>
  <nav class="headerNav">
    <a href="#">
      <span>Produtos</span>
      <span class="material-icons-outlined">expand_more</span>
    </a>
    <ul>
      <li v-for="category in categories.categories" :key="category">{{ category }}</li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ProductService } from '@/services/ProductService'

const categories = ref([])
const productService = new ProductService()

onMounted(async () => {
  try {
    categories.value = await productService.fetchCategories()
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
  }
})
</script>

<style scoped>
.headerNav {
  position: relative;
}

.headerNav a {
  color: #000;
  font-family: serif;
  text-align: center;
  display: flex;
  place-items: center;
  font-size: 18px;
  font-weight: 500;
  border-radius: 11px;
  padding: 5px;
}

.headerNav a:hover {
  background-color: #00000004;
}

.headerNav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: calc(100%);
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 150px;
  display: none;
  z-index: 555;
}

.headerNav:hover ul {
  display: block; /* Mostra o dropdown ao passar o mouse */
}

.headerNav ul li {
  padding: 10px;
  cursor: pointer;
}

.headerNav ul li:hover {
  background-color: #f5f5f5;
}
</style>
