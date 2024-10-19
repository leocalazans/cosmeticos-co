<template>
  <div class="form-group">
    <label :for="id" class="form-label">
      {{ label }} <span v-if="required" class="required">*</span>
    </label>

    <textarea
      :id="id"
      class="form-textarea"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      :required="required"
      :rows="rows"
    ></textarea>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  id: String,
  label: String,
  placeholder: String,
  required: {
    type: Boolean,
    default: false
  },
  modelValue: String,
  rows: {
    type: Number,
    default: 4 // Padrão de 4 linhas, pode ser alterado ao passar como prop
  }
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

.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
}
</style>
