# Tienda de Esquí - Inventario en Vue

Este proyecto es una tienda online de esquí implementada en Vue para manejar el inventario de productos. Cada producto posee las siguientes propiedades:
- **nombre:** Nombre del producto.
- **precio:** Precio del producto.
- **stock:** Cantidad disponible del producto.
- **disponible:** Indica si el producto está disponible (true si stock > 0, false si stock = 0).

La aplicación utiliza `reactive()` y `watch()` para garantizar que:
- Cuando el stock de un producto se reduzca a 0, `disponible` se actualice a `false`.
- Cuando se incremente el stock de un producto que estaba sin stock, `disponible` se actualice a `true`.

## Preguntas Finales

1. **¿Cómo observarías un cambio en una propiedad anidada en un objeto reactivo?**  
   *Respuesta:* Utilizando `watch()` con la opción `deep: true` para detectar cambios en todas las propiedades anidadas.

2. **¿Cómo funciona `watch()` para escuchar cambios en propiedades específicas dentro de `reactive()`?**  
   *Respuesta:* `watch()` toma una función que retorna el valor observado y ejecuta una callback con el nuevo y el valor anterior cada vez que se detecta un cambio.

3. **¿Cómo harías que un `watch()` detecte cambios en `stock` dentro de un array de productos?**  
   *Respuesta:* Aplicando `watch()` sobre el array de productos con la opción `deep: true`, permitiendo detectar cambios en cada objeto del array.
