export default function OrderHeader({ order }) {
  return (
    <div className="Order-Header">
      <h2 className='Order-Title'>Order # {order.id}</h2>
      <p className='Order-Date'>{order.purchaseDate}</p>
    </div>
  )
}