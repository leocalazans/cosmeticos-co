<template>
  <div class="searchbar">
    <button @click="onSearch">
      <span class="material-icons-outlined">search</span>
    </button>
    <input
      type="text"
      class="placeholder:text-on-surface"
      v-model="searchQuery"
      placeholder="O que está procurando hoje?"
      @input="onSearch"
    />
    <div v-if="searchQuery && filteredProducts.length > 0" class="searchbar__results">
      <router-link
        v-for="(product, index) in filteredProducts"
        :key="index"
        :to="`/product/${product.id}`"
        class="searchbar__result-item"
      >
        <img :src="product.image" alt="Imagem do produto" class="searchbar__result-image" />
        <p class="searchbar__result-name">{{ product.name }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Emissão de evento para busca
const emit = defineEmits(['search'])

// Estado da barra de pesquisa
const searchQuery = ref('')

// Produtos mockados para simulação (incluindo ID)
const productsMock = ref([
  { id: 1, name: 'Batom Matte', image: 'https://via.placeholder.com/100?text=Batom' },
  { id: 2, name: 'Perfume XYZ', image: 'https://via.placeholder.com/100?text=Perfume' },
  { id: 3, name: 'Creme Hidratante', image: 'https://via.placeholder.com/100?text=Creme' }
])

// Computed para filtrar produtos com base no input
const filteredProducts = computed(() =>
  productsMock.value.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

// Função de busca
const onSearch = () => {
  emit('search', searchQuery.value)
}
</script>

<style scoped>
.searchbar {
  display: flex;
  height: 48px;
  background-color: #f0f0f0;
  width: 50vw;
  border-radius: 45px;
  position: relative;
}

.searchbar input {
  width: 100%;
  display: block;
  height: 48px;
  background: transparent;
  padding: 5px 30px;
  padding-left: 40px;
  border: none;
  border-radius: 40px;
}

.searchbar button {
  display: block;
  background: transparent;
  border: none;
  height: 14px;
  position: absolute;
  margin-top: 12px;
  left: 5px;
}

.searchbar__results {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.searchbar__result-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  text-decoration: none;
  color: inherit;
}

.searchbar__result-image {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.searchbar__result-name {
  font-size: 14px;
}
</style>
