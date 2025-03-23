<template>
  <div :class="['product-card', { 
      'out-of-stock': !product.disponible, 
      'restocked': product.restocked 
    }]"
  >
    <h2>{{ product.nombre }}</h2>
    <p>Precio: {{ product.precio }}</p>
    <p>Stock: {{ product.stock }}</p>
    <span :style="{ color: product.disponible ? 'green' : 'red' }">
      {{ product.disponible ? 'Disponible' : 'No Disponible' }}
    </span>
    <!-- Contenedor para los botones -->
    <div class="button-container">
      <button @click="decrementStock">-</button>
      <button @click="incrementStock">+</button>
    </div>
  </div>
</template>

<script>
import { updateStock } from '../store/inventory'

export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    decrementStock() {
      // Evita que el stock sea negativo
      const newStock = this.product.stock > 0 ? this.product.stock - 1 : 0;
      updateStock(this.product.id, newStock);
    },
    incrementStock() {
      const newStock = this.product.stock + 1;
      updateStock(this.product.id, newStock);
    }
  }
}
</script>

<style scoped>
.button-container {
  margin-top: 10px;
}

button {
  margin: 0 5px;
  cursor: pointer;
}
</style>
