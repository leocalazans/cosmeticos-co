<template>
  <form @submit.prevent="handleNext">
    <div class="form-row">
      <div class="form-content">
        <TextInput
          id="firstName"
          label="Nome"
          placeholder="Nome"
          required
          v-model="shippingAddress.firstName"
          class="w-1/2"
        />
      </div>
      <div class="form-content">
        <TextInput id="lastName" label="Nome Social" v-model="shippingAddress.lastName" />
      </div>
    </div>
    <div class="form-row">
      <TextInput
        id="address"
        label="Endereço"
        required
        v-model="shippingAddress.address"
        class="w-1/2"
      />
      <div class="postalCode">
        <TextInput
          id="address-number"
          label="Numero"
          required
          v-model="shippingAddress.postalCode"
        />
      </div>
    </div>
    <CoTextarea
      id="comments"
      label="Complemento"
      placeholder="Ex: Bloco 3, Casa 1"
      v-model="comments"
      required
      rows="2"
    />
    <a class="extra-link" href="#">Add apt, suite or other</a>

    <div class="form-row">
      <div class="form-content">
        <TextInput
          id="CEP"
          label="CEP"
          placeholder="00000-000"
          required
          v-model="shippingAddress.postalCode"
          @blur="fetchAddress"
        />
      </div>
      <div class="form-content">
        <TextInput
          id="city"
          label="Cidade"
          placeholder="Ex: São Paulo"
          required
          v-model="shippingAddress.city"
        />
      </div>
    </div>
    <CoSelect
      id="province"
      label="Estado"
      :options="provinces"
      placeholder="Selecionar"
      required
      v-model="shippingAddress.province"
    />
    <TextInput
      id="phoneNumber"
      label="Telefone"
      type="tel"
      required
      v-model="shippingAddress.phoneNumber"
    />
    <div class="checkbox-group">
      <input type="checkbox" id="billingAddress" v-model="shippingAddress.useAsBillingAddress" />
      <label for="billingAddress">Usar como endereço de cobrança</label>
    </div>
    <button type="submit" class="submit-button">Proximo</button>
  </form>
</template>

<script setup>
import TextInput from '@/components/atoms/TextInput.vue'
import CoSelect from '@/components/atoms/CoSelect.vue'
import CoTextarea from '@/components/atoms/CoTextarea.vue'
import { inject, ref } from 'vue'

const emit = defineEmits(['next'])
const shippingAddress = inject('shippingAddress')

const provinces = ref([
  { value: 'AC', text: 'Acre' },
  { value: 'AL', text: 'Alagoas' },
  { value: 'AP', text: 'Amapá' },
  { value: 'AM', text: 'Amazonas' },
  { value: 'BA', text: 'Bahia' },
  { value: 'CE', text: 'Ceará' },
  { value: 'DF', text: 'Distrito Federal' },
  { value: 'ES', text: 'Espírito Santo' },
  { value: 'GO', text: 'Goiás' },
  { value: 'MA', text: 'Maranhão' },
  { value: 'MT', text: 'Mato Grosso' },
  { value: 'MS', text: 'Mato Grosso do Sul' },
  { value: 'MG', text: 'Minas Gerais' },
  { value: 'PA', text: 'Pará' },
  { value: 'PB', text: 'Paraíba' },
  { value: 'PR', text: 'Paraná' },
  { value: 'PE', text: 'Pernambuco' },
  { value: 'PI', text: 'Piauí' },
  { value: 'RJ', text: 'Rio de Janeiro' },
  { value: 'RN', text: 'Rio Grande do Norte' },
  { value: 'RS', text: 'Rio Grande do Sul' },
  { value: 'RO', text: 'Rondônia' },
  { value: 'RR', text: 'Roraima' },
  { value: 'SC', text: 'Santa Catarina' },
  { value: 'SP', text: 'São Paulo' },
  { value: 'SE', text: 'Sergipe' },
  { value: 'TO', text: 'Tocantins' }
])

const requiredFields = [
  'firstName',
  'lastName',
  'address',
  'postalCode',
  'city',
  'province',
  'phoneNumber',
  'useAsBillingAddress'
]

const areRequiredFieldsFilled = () => requiredFields.every((field) => form[field])

const handleNext = () => {
  if (areRequiredFieldsFilled) {
    emit('next', shippingAddress) // Emitindo o evento "next" com os dados do formulário
  } else {
    alert('Preencha todos os campos obrigatórios')
  }
}

const fetchAddress = async () => {
  const cep = shippingAddress.value.postalCode.replace(/\D/g, '') // Remove caracteres não numéricos
  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      if (!data.erro) {
        shippingAddress.value.address = data.logradouro
        shippingAddress.value.city = data.localidade
        shippingAddress.value.province = data.uf
      } else {
        alert('CEP não encontrado')
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error)
    }
  }
}
</script>

<style scoped>
.form-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 15px;
  width: 100%;
}
.form-content {
  width: 50%;
}

.extra-link {
  display: block;
  margin: 0.5rem 0;
  color: #0070c9;
  text-decoration: none;
}

.checkbox-group {
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
}

.checkbox-group input[type='checkbox'] {
  margin-right: 0.5rem;
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

.postalCode {
  width: 15%;
}
</style>
