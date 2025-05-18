# Respuestas al enunciado

## 1. ¿Qué ventajas ofrece GraphQL sobre REST en este contexto?
Con GraphQL el frontend pide solo los campos que necesita (evitas over-fetching) y todo va por una única URL (`/graphql`), en lugar de múltiples rutas REST. Además, la introspección y GraphiQL facilitan descubrir y probar la API sin tener que leer documentación aparte.

## 2. ¿Cómo se definen los tipos y resolvers en una API con GraphQL?
- Tipos: creas clases que heredan de `graphene.ObjectType` (por ejemplo `ProductType`) y declaras sus campos (`id`, `nombre`, `precio`, etc.).  
- Resolvers: en la clase `Query` o en tus `Mutations` escribes métodos como `resolve_all_products` o `mutate`, que realmente obtienen o modifican los datos. Graphene enlaza automáticamente tipo ↔ resolver.


## 3.. ¿Por qué es importante que el backend también actualice `disponible` y no depender solo del frontend?
Si dejas esa lógica en el cliente, cualquiera podría saltársela o modificar el stock “manualmente”. Mantenerla en el servidor garantiza que todos los clientes vean la misma información y evita inconsistencias o trampas.



## 4. ¿Cómo garantizas que la lógica de actualización de stock y disponibilidad sea coherente?
Haciendo en el servidor una única mutación (`updateStock`) que:
1. Ajusta el stock con `max(stock+amount, 0)`.  
2. Calcula `disponible = stock > 0` inmediatamente después.  
Así evitas estados intermedios erróneos y te aseguras de que cada llamada aplique siempre las mismas reglas.
