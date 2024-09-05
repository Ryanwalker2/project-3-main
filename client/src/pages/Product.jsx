import ProductHeader from "../components/Product/Card/ProductHeader";
import ProductBody from "../components/Product/Card/ProductBody";
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

const Product = (productData) => {
  return (
    <>
    <div className="text-light bg-dark p-5">
      <Container>
        <Row>
          <ProductHeader key={productData}/>
        </Row>
        <Row>
          <ProductBody key={productData}/>
        </Row>
      </Container>
    </div>
    </>
  )
}

export default Product;