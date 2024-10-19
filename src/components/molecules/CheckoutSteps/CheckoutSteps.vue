<template>
  <div class="checkout-steps">
    <div
      v-for="(step, index) in stepOptions"
      :key="index"
      class="step"
      @click="handleStep(index + 1)"
      :class="{ active: index + 1 === props.step }"
    >
      {{ index + 1 }}. {{ step }}
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['gotStep'])

const props = defineProps({
  step: {
    type: Number,
    default: 1
  }
})

const handleStep = (step) => {
  emit('gotStep', step)
}

// Array de etapas
const stepOptions = ['Shipping and Gift Options', 'Payment and Billing', 'Review and Place Order']
</script>

<style scoped>
.checkout-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
}

.step {
  flex: 1;
  text-align: center;
  font-weight: 500;
  color: #888;
  cursor: pointer; /* Adiciona um cursor pointer para melhor UX */
}

.step.active {
  color: black;
  font-weight: bold;
  border-bottom: 2px solid black;
}
</style>
