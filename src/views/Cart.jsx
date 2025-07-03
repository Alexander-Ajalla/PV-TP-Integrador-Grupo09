import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import toast from "react-hot-toast";
import "../css/Cart.css";

const Cart = () => {
  // useDispatch() Lo usás para enviar acciones que modifican el estado global.
  const dispatch = useDispatch(); // Te da acceso al dispatch de Redux.
  // useSelector() Te permite leer datos del estado global.
  // Recibe una función que accede al state.
  const cartItems = useSelector((state) => state.cart.items); // Obtiene los ítems del carrito desde el store
  /**
   * Ciclo típico:
   * useSelector() → obtener estado.
   * Usuario hace algo (ej: clic).
   * useDispatch() → dispara una acción.
   * Reducer actualiza el estado.
   * Componente se vuelve a renderizar automáticamente con el nuevo estado.
   */
  // Calcula el total en dinero y unidades de items
  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleDecrease = (id) => {
    dispatch({ type: "cart/decreaseQuantity", payload: id });
  };

  const handleIncrease = (id) => {
    dispatch({ type: "cart/increaseQuantity", payload: id });
  };

  return (
    <div className="container py-4">
      <h2 className="cart-title mb-4">🛒 Carrito de Compras</h2>

      {cartItems.length === 0 ? (
        // Mensaje si el carrito está vacío
        <div className="alert alert-info text-center">
          <p>No hay productos en el carrito.</p>
        </div>
      ) : (
        <>
          {/* Lista de productos */}
          <div className="list-group mb-4">
            {cartItems.map((item) => (
              <div
                className="d-flex justify-content-between align-items-center border rounded p-3 mb-3"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "80px", height: "auto" }}
                />
                <div className="flex-grow-1 mx-3">
                  <h5 className="cart-product-title mb-1">{item.title}</h5>
                  <div className="cart-product-unit">
                    Precio unitario: ${item.price.toLocaleString()}
                  </div>
                </div>

                {/* Controles de cantidad */}
                <div className="d-flex align-items-center gap-2 me-4">
                  <button
                    className="btn btn-outline-secondary cart-qty-btn"
                    onClick={() => handleDecrease(item.id)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="cart-qty-value">{item.quantity}</span>
                  <button
                    className="btn btn-outline-secondary cart-qty-btn"
                    onClick={() => handleIncrease(item.id)}
                  >
                    +
                  </button>
                </div>

                {/* Precio total del producto y botón eliminar */}
                <div
                  className="ms-3 d-flex align-items-center justify-content-end"
                  style={{
                    minWidth: "130px",
                    whiteSpace: "nowrap",
                    gap: "0.5rem",
                  }}
                >
                  <strong className="cart-total-amount">
                    ${(item.price * item.quantity).toLocaleString()}
                  </strong>
                  <button
                    className="btn btn-sm btn-link text-danger p-0"
                    onClick={() => {
                      dispatch(removeFromCart(item.id));
                      toast.error(`${item.title} eliminado del carrito`);
                    }}
                    title="Eliminar"
                  >
                    <i className="bi bi-trash-fill fs-5"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total de productos diferentes, unidades y botón de vaciar carrito */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <div className="mb-2">
              <h5 className="cart-total-label mb-1">
                Total productos: {cartItems.length}
              </h5>
              <h6 className="cart-total-units">
                Unidades totales: {totalUnits}
              </h6>
            </div>
            <div className="text-end">
              <h4>
                <span className="cart-total-label-inline">Total:</span>{" "}
                <span className="cart-total-amount">${total.toFixed(2)}</span>
              </h4>
              <button
                className="btn btn-danger w-100"
                onClick={() => {
                  dispatch(clearCart());
                  toast("Carrito vaciado", { icon: "🗑️" });
                }}
              >
                <i className="bi bi-trash3-fill"></i> Vaciar Carrito
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
