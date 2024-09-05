export default function ProductBody({ product }) {
  return (
    <div className="Product-Body">
      <img className="Product-Image col justify-centre">{product.image}</img>
      <section className="AddtoCart col justify-centre">
        <p className="Product-Price row justify-centre">{product.price}</p>
        <p className="Product-Quantity row justify-centre"> Left in stock: {product.quantity}</p>
      </section>
      <p className="Product-Description row">{product.description}</p>
    </div>
  )
} 