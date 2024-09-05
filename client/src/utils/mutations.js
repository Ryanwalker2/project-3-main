import { gql } from '@apollo/client';

export const MUTATION_CREATE_USER = gql`
mutation Mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
    }
  }`;

export const MUTATION_LOGIN = gql`mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }`;

  export const MUTATION_CHECKOUT = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        image
        quantity
        price
      }
    }
  }
`;

export const MUTATION_ADD_TO_CART = gql`
mutation addToCart($user: User!, $product: ID!) {
  user (_id: $user) {
    shoppingcart (products: $product) {
      products {
        _id
        name
        description
        image
        quantity
        price
      }
    }
  }
}`