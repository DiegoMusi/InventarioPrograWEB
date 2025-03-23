import { reactive, watch } from 'vue'

// Definición del estado reactivo del inventario para la tienda de esquí
export const inventory = reactive({
  products: [
    { id: 1, nombre: 'Chaqueta de esquí', precio: 250, stock: 5, disponible: true, restocked: false },
    { id: 2, nombre: 'Pantalones de esquí', precio: 180, stock: 3, disponible: true, restocked: false },
    { id: 3, nombre: 'Botas de esquí', precio: 300, stock: 2, disponible: true, restocked: false },
    { id: 4, nombre: 'Gafas de sol para nieve', precio: 90, stock: 10, disponible: true, restocked: false },
    { id: 5, nombre: 'Casco de esquí', precio: 150, stock: 4, disponible: true, restocked: false },
    { id: 6, nombre: 'Guantes térmicos', precio: 50, stock: 0, disponible: false, restocked: false }
  ]
})

// Watch para observar cambios en el array de productos (modo profundo)
watch(
  () => inventory.products,
  (newProducts) => {
    newProducts.forEach(product => {
      product.disponible = product.stock > 0
    })
  },
  { deep: true }
)

// Función para actualizar el stock de un producto específico
export function updateStock(id, newStock) {
  const product = inventory.products.find(p => p.id === id)
  if (product) {
    const wasUnavailable = product.stock === 0;
    product.stock = newStock;
    // Si el producto estaba sin stock y ahora tiene, marcarlo como reabastecido.
    if (wasUnavailable && newStock > 0) {
      product.restocked = true;
      setTimeout(() => {
        product.restocked = false;
      }, 1000); // La duración debe coincidir con la animación definida en CSS.
    }
  }
}
