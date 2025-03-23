<template>
  <div id="app">
    <header>
      <h1>Inventario de Productos</h1>
    </header>
    <ProductList />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'

export default {
  name: 'App',
  components: {
    ProductList
  }
}
</script>

<style>
/* Estilos globales */
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}

/* Estilos para centrar el header */
#app header {
  width: 100%;
  text-align: center;
  background-color: var(--primary-color);
  padding: 1rem;
  color: #fff;
  margin-bottom: 1rem;
}

/* Quitar márgenes por defecto al h1 dentro del header */
#app header h1 {
  margin: 0;
}
</style>
