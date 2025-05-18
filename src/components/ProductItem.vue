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
    product: { type: Object, required: true }
  },
  methods: {
    async decrementStock() {
      const newStock = Math.max(this.product.stock - 1, 0)
      await updateStock(this.product.id, newStock)
    },
    async incrementStock() {
      const newStock = this.product.stock + 1
      await updateStock(this.product.id, newStock)
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
