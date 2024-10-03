<template>
  <div class="searchbar" ref="searchbar">
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
    <div
      v-if="searchQuery && filteredProducts.length > 0"
      class="searchbar__results"
      ref="resultsContainer"
    >
      <router-link
        v-for="(product, index) in filteredProducts"
        :key="index"
        class="searchbar__result-item"
        :to="`/product/${product.id}`"
        @click.prevent="handleProductClick(product.id)"
      >
        <img :src="product.image" alt="Imagem do produto" class="searchbar__result-image" />
        <p class="searchbar__result-name">{{ product.name }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { ProductService } from '@/services/ProductService'
import { useProductPageStore } from '@/stores/productPageStore'

const productPageStore = useProductPageStore()

const emit = defineEmits(['search'])
const router = useRouter()

const searchQuery = ref('')
const products = ref([])
const page = ref(0) // Controle de página
const limit = 10 // Número de produtos por página
const isFetching = ref(false) // Evita chamadas duplicadas
const hasMore = ref(true) // Para controlar se há mais produtos para carregar
const searchbar = ref(null)
const resultsContainer = ref(null)

const productService = new ProductService()

const fetchProducts = async (query, pageNumber) => {
  if (isFetching.value || !hasMore.value) return
  isFetching.value = true

  const skip = pageNumber * limit

  try {
    const response = await productService.fetchProducts(skip, limit, query)
    if (response.length < limit) {
      hasMore.value = false // Não há mais produtos para carregar
    }

    products.value = [
      ...products.value,
      ...response.map((product) => ({
        id: product.id,
        name: product.name,
        image: product.image
      }))
    ]
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
  } finally {
    isFetching.value = false
  }
}

const filteredProducts = computed(() =>
  products.value.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const closeSearch = () => {
  searchQuery.value = ''
  products.value = []
  page.value = 0
  hasMore.value = true
}

const handleProductClick = async (productId) => {
  closeSearch()
  productPageStore.fetchProductById(productId)
  router.push(`/product/${productId}`)
}

const onSearch = async () => {
  if (searchQuery.value.trim()) {
    products.value = [] // Limpa os produtos atuais para a nova pesquisa
    page.value = 0 // Reseta a página
    hasMore.value = true
    await fetchProducts(searchQuery.value, page.value)
    emit('search', searchQuery.value)
    resultsContainer.value && resultsContainer.value.addEventListener('scroll', handleScroll)
  } else {
    products.value = []
  }
}

const loadMoreProducts = async () => {
  if (hasMore.value) {
    page.value += 1
    await fetchProducts(searchQuery.value, page.value)
  }
}

const handleScroll = () => {
  const scrollContainer = resultsContainer.value
  if (scrollContainer) {
    const scrollPosition = scrollContainer.scrollTop + scrollContainer.clientHeight
    const scrollHeight = scrollContainer.scrollHeight
    if (scrollPosition >= scrollHeight - 10) {
      loadMoreProducts() // Carregar mais produtos quando chegar ao final
    }
  }
}

const handleClickOutside = (event) => {
  if (searchbar.value && !searchbar.value.contains(event.target)) {
    closeSearch()
  }
}

onMounted(() => {
  fetchProducts('', 0)
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  // searchbar.value.removeEventListener('scroll', handleScroll)
  // resultsContainer.value.removeEventListener('scroll', handleScroll) // Remover o listener do contêiner de resultados
})
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
  max-height: 300px;
  overflow-y: auto;
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

.searchbar__results::-webkit-scrollbar {
  width: 8px;
}

.searchbar__results::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
}

.searchbar__results::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.searchbar__results::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}

.searchbar__results {
  scrollbar-width: thin;
  scrollbar-color: #ccc #f0f0f0;
}
</style>
