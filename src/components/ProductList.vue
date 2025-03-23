<template>
  <div class="product-list">
    <ProductItem 
      v-for="product in products" 
      :key="product.id" 
      :product="product" 
    />
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue'
import { inventory } from '../store/inventory'

export default {
  name: 'ProductList',
  components: {
    ProductItem
  },
  computed: {
    products() {
      return inventory.products;
    }
  }
}
</script>

<style scoped>
/* Elimina estilos que puedan sobreescribir los estilos globales,
   en este caso no definimos nada para que se usen los estilos de src/style.css */
</style>
