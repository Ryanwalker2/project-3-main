import OrderHeader from '../components/Order/Card/OrderHeader';
import OrderBody from '../components/Order/Card/OrderBody';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

// import { getMe } from '../utils/API';
// import Auth from '../utils/auth';
// import { useState, useEffect } from 'react';
// import { useQuery } from '@apollo/client';
// import { QUERY_ONE_ORDER } from '../utils/queries';

const Order = (orderData) => {
  return (
  <>
    <div className="text-light bg-dark p-5">
      <Container>
        <Row>
          <OrderHeader key={orderData} />
        </Row>
        <Row>
          <OrderBody key={orderData} />
        </Row>
      </Container>
    </div>
  </>
  )
};

export default Order; 