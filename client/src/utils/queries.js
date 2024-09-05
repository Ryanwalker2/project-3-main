import { gql } from '@apollo/client';

export const QUERY_USER_DATA = gql`
query Query {
  user {
    _id
    firstName
    lastName
    email
    orders {
      purchaseDate
      _id
      products {
        _id
        name
        description
        image
        quantity
        price
      }
    }
    shoppingcart {
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
}`;

export const QUERY_SEARCH_PRODUCTS = gql`query Query($name: String) {
products(name: $name) {
  name
  _id
  description
  image
  price
  quantity
}
}`;

export const QUERY_CART = gql`{
  user {
    _id
    shoppingcart {
      products {
        name
        _id
        description
        image
        quantity
        price
      }
    }
  }
}`