<template>
  <div class="account">
    <div class="account__button" @click="toggleAccount">
      <span class="material-icons-outlined">account_circle</span>
    </div>
    
    <div class="account__card" v-if="isAccountVisible">
      <h3 class="text-lg font-bold text-gray-800">Conta do Usuário</h3>
      
      <div v-if="isLoggedIn">
        <p class="mt-2 text-gray-600">Bem-vindo, {{ userName }}!</p>
        <button @click="toggleLogin" class="mt-2 text-red-500 hover:underline">Sair</button>
      </div>
      
      <div v-else>
        <form @submit.prevent="handleLogin" class="flex flex-col mt-4">
          <label for="username" class="text-sm font-semibold text-gray-700">Usuário:</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            placeholder="Digite seu usuário" 
            class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 mb-2"
            required
          />
          
          <label for="password" class="text-sm font-semibold text-gray-700">Senha:</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="Digite sua senha" 
            class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 mb-4"
            required
          />
          
          <button 
            type="submit" 
            class="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isAccountVisible = ref(false);
const userName = ref('John Doe');
const isLoggedIn = ref(false);
const username = ref('');
const password = ref('');

// Função para alternar a visibilidade do cartão
const toggleAccount = () => {
  isAccountVisible.value = !isAccountVisible.value;
};

// Alterna o estado de login
const toggleLogin = () => {
  isLoggedIn.value = !isLoggedIn.value;
};

// Função para tratar o login
const handleLogin = () => {
  // Simulação de autenticação
  if (username.value && password.value) {
    isLoggedIn.value = true; // Loga o usuário
    userName.value = username.value; // Define o nome de usuário
    username.value = ''; // Limpa o campo de usuário
    password.value = ''; // Limpa o campo de senha
  }
};

// Função para fechar o cartão ao sair
const handleMouseLeave = () => {
  if (!isLoggedIn.value) {
    isAccountVisible.value = false;
  }
};

// Escutando cliques fora do cartão para fechá-lo
const handleClickOutside = (event: MouseEvent) => {
  const card = document.querySelector('.account__card');
  const button = document.querySelector('.account__button');

  if (card && button && !card.contains(event.target as Node) && !button.contains(event.target as Node)) {
    isAccountVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
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
}

.account__button:hover {
  transform: scale(1.1);
}

.account__card {
  position: absolute;
  top: 100%;
  right: 0px;
  padding: 15px;
  background-color: rgba(249, 249, 249, 0.9); 
  border: 1px solid rgba(221, 221, 221, 0.7);
  border-radius: 12px; /* Arredondando os cantos */
  margin-top: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Aumentando a sombra */
  z-index: 100; 
  min-width: 240px; /* Aumentando a largura mínima */
}
</style>
