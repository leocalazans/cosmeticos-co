<template>
  <div class="account">
    <div class="account__button" @click="toggleAccount">
      <span class="material-icons-outlined">account_circle</span>
    </div>

    <div class="account__card" v-if="isAccountVisible">
      <h3 class="text-lg font-bold text-gray-800">Usuário</h3>

      <div v-if="isLoggedIn">
        <p class="mt-2 text-gray-600">Bem-vindo, {{ userName }}!</p>
        <button
          @click="toggleLogin"
          class="account__button_exit account__button-submit mt-2 text-red-500 hover:underline"
        >
          Sair
        </button>
      </div>

      <div v-else>
        <form @submit.prevent="handleLogin" class="flex flex-col mt-4">
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Digite seu usuário"
            class="account__input"
            required
          />
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Digite sua senha"
            class="account__input"
            required
          />

          <button type="submit" class="account__button account__button-submit">Entrar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isAccountVisible = ref(false)
const userName = ref('John Doe')
const isLoggedIn = ref(false)
const username = ref('')
const password = ref('')

const toggleAccount = () => {
  isAccountVisible.value = !isAccountVisible.value
}

const toggleLogin = () => {
  isLoggedIn.value = !isLoggedIn.value
}

const handleLogin = () => {
  if (username.value && password.value) {
    isLoggedIn.value = true
    userName.value = username.value
    username.value = ''
    password.value = ''
  }
}

const handleMouseLeave = () => {
  if (!isLoggedIn.value) {
    isAccountVisible.value = false
  }
}

const handleClickOutside = (event: MouseEvent) => {
  const card = document.querySelector('.account__card')
  const button = document.querySelector('.account__button')

  if (
    card &&
    button &&
    !card.contains(event.target as Node) &&
    !button.contains(event.target as Node)
  ) {
    isAccountVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.account {
  position: relative;
  display: flex;
  align-items: center;
}

.account__button {
  padding: 10px;
  cursor: pointer;
  transition: transform 0.2s;
  color: #000;
}

.account__button:hover {
  transform: scale(1.1);
}

.account__card {
  position: absolute;
  top: 100%;
  right: 0px;
  padding: 15px;
  background-color: rgb(249, 249, 249);
  border: 1px solid rgba(221, 221, 221, 0.7);
  border-radius: 20px;
  margin-top: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 240px;
}

.account__input {
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  background-color: #f9fafb;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  margin-bottom: 16px;
  font-size: 12px;
  outline: none;
  width: 100%;
}

.account__input:focus {
  border-color: #000000;
  box-shadow: 0 0 0 3px rgba(173, 173, 173, 0.3);
}

.account__input::placeholder {
  color: #9ca3af;
  opacity: 1;
}

.account__button-submit {
  width: 100%;
  padding: 6px 15px;
  border: none;
  border-radius: 20px;
  background-color: #000000;
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
}

.account__button-submit:hover {
  background-color: #9d9e9d;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.account__button-submit:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(166, 167, 166, 0.5);
}

.account__button-submit:active {
  background-color: #898a89;
  transform: scale(0.98);
}
</style>
