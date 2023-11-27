import { useContext, useEffect } from "react"
import DataContext from "../context/dataContext"
import { Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { shopCart, increase, decrease, removeFromCart, formatNumber } = useContext(DataContext)
  const navigate = useNavigate()

  const updatedCart = shopCart.filter((item) => item.count > 0)

  useEffect(() => {
    removeFromCart(updatedCart)
  }, [])

  const total = updatedCart.reduce((a, { count, precio }) => a + precio * count, 0)

  const clearCart = () => {
    updatedCart.forEach((item) => removeFromCart(item.id));
  }

  const handleGoToPaying = () => {
    clearCart()
    navigate('/paying')
  }

  return (
    <div className="container-cart">
      <div className="p-2">
        <h2>Detalles del pedido:</h2>
      </div>
      <div className="p-1 bg-dark">
        <ul className="cart-ul">
          {updatedCart?.map((item) => (
            <li key={item?.id} className="cart-item">
              <div className="item-details">
                <img src={item?.img} alt={item?.name} className="img-small" />
                <span className="fw-bold" style={{ textTransform: 'capitalize' }}>{item?.nombre}</span>
                <div className="quantity-controls">
                  <span className="fw-bold">Precio: $ {formatNumber(item?.precio)} </span>
                  <Button variant="danger" onClick={() => decrease(item?.id)}>-</Button>
                  <b>{item?.count}</b>
                  <Button variant="primary" onClick={() => increase(item?.id)}>+</Button>
                </div>
                <span className="fw-bold">Total: ${formatNumber(item?.precio * item?.count)} </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="total-price">
          <span> Precio total del pedido: ${formatNumber(total)}</span>
        </div>
        {total > 0 && (
          <div className="btn-price">
            <Button onClick={clearCart}>Vaciar Carrito</Button>
            <Button onClick={handleGoToPaying}>Ir a pagar</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart