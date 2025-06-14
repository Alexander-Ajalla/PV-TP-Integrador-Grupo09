import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <>
      <div className="container">
        <h2>Carrito de Compras</h2>
        {cartItems.length === 0 ? (
          <div className="alert alert-info text-center">
            <p>No hay productos en el carrito.</p>
          </div>
        ) : (
          <>
            <ul className="list-group mb-2">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item py-1 px-2 d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.title}</strong> — {item.quantity} x{" "}
                    {item.price} USD = {(item.quantity * item.price).toFixed(2)}{" "}
                    USD
                    <div className="product-card-img-container">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
            <h4>Total: {total.toFixed(2)} USD</h4>
            <button
              className="btn btn-danger me-2"
              onClick={() => dispatch(clearCart())}
            >
              Vaciar Carrito
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
