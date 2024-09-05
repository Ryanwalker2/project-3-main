import ListItem from "../../ListItem";
import ProductHeader from "../../Product/Card/ProductHeader";
import { Link } from "react-router-dom";

export default function OrderBody(order) {

  const checkProducts = (order) => {
    if (order) {
      return (<p>No Products Found</p>);
    } else {
      return (
        order.products.map((product) => {
          <ListItem key={product}>
            <ProductHeader key={product}/>
          <Link
          to={`/product/${product._id}`}
          className="badge bg-primary rouded-pill">
            View Product
          </Link>
          </ListItem>
        })
      )
    }
  }

  return (
    <div className="Order-Body">
      <ul className="Product-List">
        {checkProducts(order)}
      </ul>
      <section className="Order-Total">
        {/* <p>Order Total: {order.total}</p> */}
      </section>
    </div>
  )
}