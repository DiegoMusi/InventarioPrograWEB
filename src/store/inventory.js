import { reactive, watch } from 'vue'

const GRAPHQL_URL = 'http://localhost:5000/graphql'

// Estado reactivo
export const inventory = reactive({
  products: []
})

// 1) Función para cargar todos los productos desde el backend
export async function loadProducts() {
  const query = `
    query {
      allProducts {
        id
        nombre
        precio
        stock
        disponible
      }
    }
  `
  const resp = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  })
  const { data, errors } = await resp.json()
  if (errors) {
    console.error('Error cargando productos:', errors)
    return
  }
  // Rellenamos el array reactivo
  inventory.products.splice(0, inventory.products.length, ...data.allProducts.map(p => ({
    ...p,
    restocked: false
  })))
}

// 2) Watch para recalcular disponible por si acaso (sigue aquí por seguridad)
watch(
  () => inventory.products,
  (newProducts) => {
    newProducts.forEach(product => {
      product.disponible = product.stock > 0
    })
  },
  { deep: true }
)

// 3) Función para actualizar stock vía GraphQL y reflejarlo en la UI
export async function updateStock(id, newStock) {
  const amount = newStock - (inventory.products.find(p => p.id === id)?.stock || 0)
  const mutation = `
    mutation($id: Int!, $amount: Int!) {
      updateStock(id: $id, amount: $amount) {
        product {
          id
          stock
          disponible
        }
      }
    }
  `
  const resp = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: mutation, variables: { id, amount } })
  })
  const { data, errors } = await resp.json()
  if (errors) {
    console.error('Error actualizando stock:', errors)
    return
  }

  // Actualizamos el objeto local con la respuesta del servidor
  const updated = data.updateStock.product
  const product = inventory.products.find(p => p.id === updated.id)
  if (product) {
    const wasUnavailable = product.stock === 0
    product.stock = updated.stock
    product.disponible = updated.disponible

    // Animación restocked como antes
    if (wasUnavailable && updated.stock > 0) {
      product.restocked = true
      setTimeout(() => {
        product.restocked = false
      }, 1000)
    }
  }
}

// 4) Al arrancar la aplicación, carga los productos una vez
loadProducts()
  .catch(err => console.error('No se pudieron cargar productos:', err))
