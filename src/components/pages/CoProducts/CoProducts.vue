<template>
  <div class="products">
    <CoProductList title="Todos os Produtos" />
  </div>
</template>

<script setup lang="ts">
import CoProductList from '@/components/organisms/CoProductList/CoProductList.vue'
</script>

<style scoped>
.products {
  padding: 20px;
}
</style>
