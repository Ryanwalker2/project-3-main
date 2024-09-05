import { Row } from 'react-bootstrap';

const UserInformation = (user) => {

  const orderCount = (orders) => {
    if (!orders) {
      return ('0');
    } else {
      return (orders.length);
    }
  };

  return (
    <>
    <Row>
      <p>{user.firstName + user.lastName}</p>
      <p>Previous Order Count: {orderCount(user.orders)}</p>
    </Row>
    </>
  )
}

export default UserInformation;