<template>
  <div class="review-section">
    <h3>Review Your Order</h3>
    <div class="order-summary">
      <div class="summary-item">
        <span>Shipping Address:</span>
        <span>{{ shippingAddress }}</span>
      </div>
      <div class="summary-item">
        <span>Payment Method:</span>
        <span>Card ending in **** {{ paymentInfo.cardNumber.slice(-4) }}</span>
      </div>
      <div class="summary-item">
        <span>Total:</span>
        <span>$100.00</span>
        <!-- Adjust this as needed -->
      </div>
    </div>
    <button class="submit-button" @click="placeOrder">Place Order</button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const shippingAddress = inject('shippingAddress')
const paymentInfo = inject('paymentInfo')

const placeOrder = () => {
  console.log('Order placed')
  // Aqui você pode adicionar lógica para enviar o pedido ao backend.
}
</script>

<style scoped>
.review-section {
  padding: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.submit-button {
  background-color: black;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
}
</style>
