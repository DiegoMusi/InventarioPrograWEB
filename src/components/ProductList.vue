<template>
  <div class="product-list">
    <!-- Muestra un mensaje mientras cargan los productos -->
    <p v-if="loading">Cargando productos…</p>
    <ProductItem 
      v-for="product in products" 
      :key="product.id" 
      :product="product" 
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import ProductItem from './ProductItem.vue'
import { inventory, loadProducts } from '../store/inventory'

export default {
  name: 'ProductList',
  components: { ProductItem },
  setup() {
    const loading = ref(true)

    onMounted(async () => {
      try {
        await loadProducts()
      } catch (e) {
        console.error('Error cargando productos:', e)
      } finally {
        loading.value = false
      }
    })

    return {
      products: inventory.products,
      loading
    }
  }
}
</script>

<style scoped>
/* Aquí van estilos específicos de ProductList si los necesitas */
</style>
