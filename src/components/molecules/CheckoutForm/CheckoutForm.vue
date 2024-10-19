<template>
  <form @submit.prevent="submitCheckout">
    <TextInput v-model="name" placeholder="Name" />
    <TextInput v-model="address" placeholder="Address" />
    <TextInput v-model="creditCard" type="number" placeholder="Credit Card Number" />
    <Button variant="primary" :disabled="!isFormValid">Checkout</Button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import TextInput from '@/components/atoms/TextInput.vue'
import Button from '@/components/atoms/Button.vue'

const name = ref('')
const address = ref('')
const creditCard = ref('')

const isFormValid = computed(() => name.value && address.value && creditCard.value.length === 16)

const submitCheckout = () => {
  console.log('Checkout submitted:', {
    name: name.value,
    address: address.value,
    creditCard: creditCard.value
  })
}
</script>
