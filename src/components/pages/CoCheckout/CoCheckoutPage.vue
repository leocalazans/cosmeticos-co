<!-- src/components/pages/CheckoutPage.vue -->
<template>
  <section class="checkout-page">
    <div class="checkout-content">
      <div class="content-forms">
        <CheckoutSteps :step="step" @gotStep="handleStep" />
        <div v-if="step === 1">
          <ShippingForm @next="goToNextStep" />
        </div>
        <div v-if="step === 2">
          <FormPaymentBilling @next="goToNextStep" />
        </div>
        <div v-if="step === 3">
          <FormReviewOrder @placeOrder="placeOrder" />
        </div>
      </div>
      <aside>
        <OrderSummary />
      </aside>
    </div>
  </section>
</template>

<script setup>
import { ref, provide } from 'vue'

import OrderSummary from '@/components/organisms/OrderSummary/OrderSummary.vue'
import CheckoutSteps from '@/components/molecules/CheckoutSteps/CheckoutSteps.vue'
import ShippingForm from '@/components/molecules/ShippingForm/ShippingForm.vue'
import FormPaymentBilling from '@/components/molecules/FormPaymentBilling/FormPaymentBilling.vue'
import FormReviewOrder from '@/components/molecules/FormReviewOrder/FormReviewOrder.vue'

const handleSubmit = (checkoutData) => {
  console.log('Proceeding to payment with:', checkoutData)
  // Redirecionar para página de confirmação ou enviar dados para backend
}

const step = ref(1)

const shippingAddress = ref({
  firstName: '',
  lastName: '',
  address: '',
  postalCode: '',
  city: '',
  province: '',
  phoneNumber: '',
  useAsBillingAddress: false
})

const paymentInfo = ref({
  cardNumber: '',
  cardName: '',
  cardExpiration: '',
  cardCvv: '',
  billingAddress: ''
})

const goToNextStep = () => {
  step.value += 1
}

// Fornece os dados de shipping e payment para o último formulário
provide('shippingAddress', shippingAddress)
provide('paymentInfo', paymentInfo)

const placeOrder = () => {
  console.log('Order placed with the following data:')
  console.log('Shipping Address:', shippingAddress.value)
  console.log('Payment Info:', paymentInfo.value)
  // Aqui você pode adicionar a lógica de envio do pedido ao backend.
}

const areAllFieldsFilled = (obj) => {
  return Object.values(obj).every((value) => {
    if (typeof value === 'boolean') return true
    return value.trim() !== ''
  })
}

const handleStep = (newStep) => {
  // Verifica se o novo passo é anterior ao passo atual
  if (newStep < step.value) {
    step.value = newStep
  }
  // Verifica se o novo passo é o próximo
  else if (newStep === step.value + 1) {
    // Verifica se todos os campos estão preenchidos do passo atual
    if (
      (step.value === 1 && areAllFieldsFilled(shippingAddress.value)) ||
      (step.value === 2 && areAllFieldsFilled(paymentInfo.value))
    ) {
      step.value = newStep
    } else {
      alert('Por favor, preencha todos os campos obrigatórios para prosseguir.')
    }
  }
}
</script>

<style scoped>
.checkout-page {
  @apply max-w-4xl mx-auto p-4;
}
.checkout-content {
  @apply grid grid-cols-1 md:grid-cols-2 gap-8;
}
@media (min-width: 990px) {
  .checkout-content {
    display: flex;
    justify-content: space-between;
  }
  .content-forms {
    width: 65%;
    padding: 5rem 8rem;
  }
  aside {
    width: 35%;
    background-color: #f9f9f9;
    border-left: solid 1px #eaeaea;
    padding: 60px 30px;
  }
}
</style>
