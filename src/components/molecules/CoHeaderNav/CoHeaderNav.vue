<template>
  <nav class="headerNav">
    <a href="#">
      <span>Produtos</span>
      <span class="material-icons-outlined">
        expand_more
      </span>
    </a>
    <ul>
      <li>Maquiagem</li>
      <li>Perfumes</li>
    </ul>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.headerNav {
  position: relative;
}

.headerNav a {
  color: #000;
  font-family: serif;
  text-align: center;
  display: flex;
  place-items: center;
  font-size: 18px;
  font-weight: 500;
  border-radius: 11px;
  padding: 5px;
}

.headerNav a:hover {
  background-color: #00000004;
}

.headerNav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 50%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 150px;
  display: none; /* Escondido por padrão */
}

.headerNav:hover ul {
  display: block; /* Mostra o dropdown ao passar o mouse */
}

.headerNav ul li {
  padding: 10px;
  cursor: pointer;
}

.headerNav ul li:hover {
  background-color: #f5f5f5;
}
</style>
