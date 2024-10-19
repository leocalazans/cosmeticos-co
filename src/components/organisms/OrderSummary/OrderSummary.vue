<template>
  <div class="order-summary">
    <h2>Order Summary</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.name }} - {{ item.quantity }} x {{ item.price | currency }}
      </li>
    </ul>
    <p>Total: {{ total | currency }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items)
const total = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.quantity * item.price, 0)
)
</script>

<style scoped>
.order-summary {
  @apply p-12  rounded;
}

.order-summary {
  background-color: #fff;
  padding: 10px;
}

.order-summary h2 {
  color: #6c6c6d;
}
</style>
