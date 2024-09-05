import { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row,
  Alert
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveProductIds } from '../utils/localStorage';
import { QUERY_SEARCH_PRODUCTS } from '../utils/queries';
import { MUTATION_ADD_TO_CART } from '../utils/mutations';

const SearchProducts = () => {
  //return <h1>it is working...</h1>
  // create state for holding returned google api data
  // const [searchedProducts, setSearchedProducts] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  const [queryProducts, {loading, data}] = useLazyQuery(QUERY_SEARCH_PRODUCTS);
  console.log('data: ', data);

  if(data){
    saveProductIds(data.products)
  }

  // create state to hold favorite productId values
  const [favoriteProductsIds, setfavoriteProductsIds] = useState([]);

  // set up useEffect hook to save `favoriteProductIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveProductIds(favoriteProductsIds);
  }, []);

  // create method to search for products and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("inHandleFormSubmit")
    if (!searchInput) {
      return false;
    }
    try {
      queryProducts({variables: {name: searchInput}});
      // const { items } = await response.json();

      // const ProductData = items.map((product) => ({
      //   productId: product.id,
      //   name: product.name,
      //   description: product.description,
      //   image: product.imageLinks?.thumbnail || '',
      //   price:product.price
      // }));

      // setSearchProducts(productData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a product to our database
  const handleSaveProduct = async (productId) => {
    console.log('hello')
    // find the product in `searchedProducts` state by the matching id
    const productToSave = searchProducts.find((product) => product.productId === productId);
    console.log(searchProducts)
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveProduct(productToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if product successfully saves to user's account, save product id to state
      setFavoriteProductIds([...favoriteProductIds, ProductToSave.productId]);
    } catch (err) {
      console.error(err);
    }
  };
  const SaveToCart = async (event) => {
    event.preventDefault();    

    const [addToCart] = useMutation(MUTATION_ADD_TO_CART);

    
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await addToCart(token.user, event.target);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      return( new Alert('Product Added to Cart!'));
    
    } catch (err) {
      console.error(err);
    }
  }


  if(loading) return <p>Loading...</p>;

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Products!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a Product'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {data?.products?.length
            ? `Viewing ${data.products.length} results:`
            : 'Search for a product to begin'}
        </h2>
        <Row>
          {data?.products?.map((product, index) => {
            return (
              <Col md="4" key={'prod-' + index}>
                <Card border='dark'>
                  {product.image ? (
                    <Card.Img src={product?.image?.replace('/client/public', '')} alt={`The cover for ${product.name}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description} ${product.price}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={favoriteProductsIds?.some((favoriteProductId) => favoriteProductId === product.productId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveProduct(product.productId)}>
                        {favoriteProductsIds?.some((favoriteProductId) => favoriteProductId === product.productId)
                          ? 'This product has already been saved!'
                          : 'Save this product!'}
                      </Button>
                      
                    )
                    }
                    <Button onClick={SaveToCart}>
                        Add to Cart
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

export default SearchProducts;
