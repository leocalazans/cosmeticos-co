<template>
  <div class="form-group">
    <label :for="id" class="form-label">
      {{ label }} <span v-if="required" class="required">*</span>
    </label>

    <input
      :id="id"
      :type="type"
      class="form-input"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      :required="required"
    />
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  },
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
  width: 100%;
}

.form-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.required {
  color: red;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
</style>
