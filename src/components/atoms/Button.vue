<template>
  <button :class="computedClass" @click="onClick">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary' },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])

const onClick = () => {
  if (!props.disabled) emit('click')
}

const computedClass = computed(() => {
  return ['button', `button--${props.variant}`, { 'button--disabled': props.disabled }]
})
</script>

<style scoped>
.button {
  @apply py-2 px-4 text-white rounded;
}
.button--primary {
  @apply bg-blue-500;
}
.button--secondary {
  @apply bg-gray-500;
}
.button--disabled {
  @apply bg-gray-300 cursor-not-allowed;
}
</style>
