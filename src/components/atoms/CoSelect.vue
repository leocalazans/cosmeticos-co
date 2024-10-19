<template>
  <div class="form-group">
    <label :for="id" class="form-label">
      {{ label }} <span v-if="required" class="required">*</span>
    </label>
    <select
      :id="id"
      class="form-select"
      v-model="localValue"
      @change="$emit('update:modelValue', localValue)"
    >
      <option disabled value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  id: String,
  label: String,
  options: Array,
  placeholder: String,
  required: {
    type: Boolean,
    default: false
  },
  modelValue: String
})

const { modelValue } = toRefs(props)
const localValue = computed({
  get: () => modelValue.value,
  set: (val) => (modelValue.value = val)
})
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.required {
  color: red;
}

.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
}
</style>
