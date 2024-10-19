<template>
  <form @submit.prevent="handleNext">
    <TextInput id="cardNumber" label="Card Number" required v-model="form.cardNumber" />
    <TextInput id="cardName" label="Name on Card" required v-model="form.cardName" />
    <TextInput id="cardExpiration" label="Expiration Date" required v-model="form.cardExpiration" />
    <TextInput id="cardCvv" label="CVV" required type="password" v-model="form.cardCvv" />
    <TextInput id="billingAddress" label="Billing Address" required v-model="form.billingAddress" />
    <button type="submit" class="submit-button">Next</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import TextInput from '@/components/atoms/TextInput.vue'

const form = reactive({
  cardNumber: '',
  cardName: '',
  cardExpiration: '',
  cardCvv: '',
  billingAddress: ''
})

const emit = defineEmits(['next'])

const handleNext = () => {
  if (form.cardNumber && form.cardExpiration && form.cardCvv) {
    emit('next', form) // Emitindo o evento "next" com os dados do formulário
  } else {
    alert('Preencha todos os campos obrigatórios')
  }
}
</script>

<style scoped>
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
