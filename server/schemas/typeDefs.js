
const typeDefs = `
    type Product{
        _id: ID
        name: String
        description: String
        image: String
        quantity: Int
        price: Float
    }

    type User{
        _id: ID
        firstName: String
        lastName: String
        email: String
        orders: [Order]
        shoppingcart: [ShoppingCart]
    }

    type Order{
        _id: ID
        purchaseDate: String
        products: [Product]
    }

    type ShoppingCart{
        products: [Product]
    }

    type Checkout{
        session: ID
    }

    type Auth{
        token: ID
        #user: User
    }

    type Query{
        products(name: String): [Product]
        product(_id: ID!): Product
        user: User
        order(_id: ID!): Order
        #allOrders: [Order]
        checkout(products: [ID]!): Checkout
        shoppingCart(products: [ID]!): ShoppingCart
    }

    type Mutation{
        updateProduct(_id: ID!, quantity: Int!): Product
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        addOrder(products: [ID]!): Order
        addToCart(_id: ID!, product: [ID]!): ShoppingCart
    }

`;

module.exports = typeDefs;