import { useState, useEffect } from 'react';
import {useQuery} from '@apollo/client';
import { QUERY_USER_DATA } from '../utils/queries';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeProductId } from '../utils/localStorage';
import { json } from 'react-router-dom';

const FavoriteProducts = () => {
  ///return <h1>Favorite Products Component Works.</h1>
  //const [userData, setUserData] = useState({});
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorite_products")))
console.log(favorites)
  // use this to determine if `useEffect()` hook needs to run again
  

  // const {loading, data} = useQuery(QUERY_USER_DATA);
  //   console.log('userData: ', data);
    

  
  // create function that accepts the products's mongo _id value as param and deletes the product from the database
  const handleDeleteProduct= async (productId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteProduct(productId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove product's id from localStorage
      removeProductId(productId);
    } catch (err) {
      console.error(err);
    }
  };

  // if(!data || data.user) return <h2>No User Data</h2>
  // if data isn't here yet, say so
  // if (loading) {
  //   return <h2>LOADING...</h2>;
  // }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing favorite products!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          
          {favorites?.length
            ? `Viewing ${favorites.length} favorite ${favorites.length === 1 ? 'product' : 'products'}:`
            : 'You have no favorite products!'}
        </h2>
        <Row>
          {favorites.map((product) => {
            return (
              <Col md="4">
                <Card key={product.productId} border='dark'>
                  {product.image ? <Card.Img src={product?.image?.replace('/client/public', '')} alt={`The cover for ${product.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteProduct(product.productId)}>
                      Delete this product!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default FavoriteProducts; 
