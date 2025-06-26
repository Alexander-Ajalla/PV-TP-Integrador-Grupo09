import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

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
      <h2 className="mb-4">🛒 Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center">
          <p>No hay productos en el carrito.</p>
        </div>
      ) : (
        <>
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
                  <h5 className="mb-1">{item.title}</h5>
                  <div className="text-muted">
                    Precio unitario: ${item.price.toLocaleString()}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2 me-4">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleDecrease(item.id)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleIncrease(item.id)}
                  >
                    +
                  </button>
                </div>

                <div
                  className="ms-3 d-flex align-items-center justify-content-end"
                  style={{
                    minWidth: "130px",
                    whiteSpace: "nowrap",
                    gap: "0.5rem",
                  }}
                >
                  <strong>
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
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <div className="mb-2">
              <h5 className="mb-1">Total productos: {cartItems.length}</h5>
              <h6 className="text-muted">Unidades totales: {totalUnits}</h6>
            </div>
            <div className="text-end">
              <h4>
                Total: <span className="text-success">${total.toFixed(2)}</span>
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
