import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <>
      <div>
        <h2>Carrito de Compras</h2>
        {cartItems.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.title}</strong> — {item.quantity} x{" "}
                    {item.price} USD
                  </div>
                  <button onClick={() => dispatch(removeFromCart(item.id))}>
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => dispatch(clearCart())}>
              Vaciar Carrito
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
