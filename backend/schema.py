import graphene

DEFAULT_PRODUCTS = [
    {"id": 1, "nombre": "Chaqueta de esquí",         "precio": 250.0, "stock": 5,  "disponible": True},
    {"id": 2, "nombre": "Pantalones de esquí",       "precio": 180.0, "stock": 3,  "disponible": True},
    {"id": 3, "nombre": "Botas de esquí",            "precio": 300.0, "stock": 2,  "disponible": True},
    {"id": 4, "nombre": "Gafas de sol para nieve",   "precio":  90.0, "stock": 10, "disponible": True},
    {"id": 5, "nombre": "Casco de esquí",            "precio": 150.0, "stock": 4,  "disponible": True},
    {"id": 6, "nombre": "Guantes térmicos",          "precio":  50.0, "stock": 0,  "disponible": False},
]

products_data = []


def ensure_data():
    if not products_data:
        products_data.extend(DEFAULT_PRODUCTS)


class ProductType(graphene.ObjectType):
    id = graphene.Int()
    nombre = graphene.String()
    precio = graphene.Float()
    stock = graphene.Int()
    disponible = graphene.Boolean()

class Query(graphene.ObjectType):
    all_products = graphene.List(ProductType)

    def resolve_all_products(self, info):
        ensure_data()
        return [ProductType(**prod) for prod in products_data]

class UpdateStock(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        amount = graphene.Int(required=True)

    product = graphene.Field(lambda: ProductType)

    def mutate(self, info, id, amount):
        ensure_data()
        for prod in products_data:

            if prod["id"] == id:
                new_stock = max(prod["stock"] + amount, 0)
                prod["stock"] = new_stock
                prod["disponible"] = new_stock > 0
                return UpdateStock(product=ProductType(**prod))

        raise Exception(f"Producto con id {id} no encontrado")

class Mutation(graphene.ObjectType):
    update_stock = UpdateStock.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)