<template>
  <CoHeader v-if="showHeader" />
  <RouterView />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CoHeader from './components/organisms/CoHeader/CoHeader.vue'
const route = useRoute()
const showHeader = computed(() => {
  return route.meta.showHeader !== false // Se a meta 'showHeader' for false, não exibe o cabeçalho
})
</script>

<style scoped>
/* Estilos gerais do App.vue */
</style>
