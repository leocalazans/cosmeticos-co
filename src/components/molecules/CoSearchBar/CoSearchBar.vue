<template>
    <div class="searchbar">
      <button @click="onSearch"> 
        <span class="material-icons-outlined">
          search
        </span>
      </button>
      <input type="text" class="placeholder:text-on-surface" v-model="searchQuery" placeholder="O que esta procurando hoje?" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const emit = defineEmits(['search']);

  const searchQuery = ref('');
  const onSearch = () => {
    emit('search', searchQuery.value);
  };
  </script>
  
  <style scoped>

  .searchbar {
    display: flex;
    height: 48px;
    background-color: #F0F0F0;
    width:50vw;
    border-radius: 45px;
    position: relative;
  }

  .searchbar input{
    width: 100%;
    display: block;
    height: 48px;
    background:transparent;
    padding: 5px 30px;
    padding-left: 40px;
    border:none;
    border-radius: 40px;
  }

  .searchbar button{
    display: block;
    background: transparent;
    border: none;
    height:14px;
    position: absolute;
    margin-top: 12px;
    left: 5px;
  }
  </style>
  