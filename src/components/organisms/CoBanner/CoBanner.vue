<template>
    <div class="banner" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="banner__content">
        
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    backgroundImage: string; 
  }>();
  </script>
  
  <style scoped>
  .banner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70vh; 
    background-color: orange; 
    background-size: cover;
    background-position: center;
    color: white;
    padding: 20px;
    text-align: center;
  }
  
  .banner__content {
    background-color: rgba(0, 0, 0, 0.5); 
    padding: 20px;
    border-radius: 8px;
  }
  
  .banner__title {
    font-size: 2.5rem; 
    margin: 0;
  }
  
  .banner__subtitle {
    font-size: 1.2rem; 
  }
  </style>
  