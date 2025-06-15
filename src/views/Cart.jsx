import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import ProductCard from "../components/ProductCard";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className="container py-4">
        <h2 className="mb-4">🛒 Carrito de Compras</h2>
        {cartItems.length === 0 ? (
          <div className="alert alert-info text-center">
            <p>No hay productos en el carrito.</p>
          </div>
        ) : (
          <>
            <ul className="list-group mb-4">
              {cartItems.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className="badge bg-primary mb-2">
                    Cantidad: {item.quantity}
                  </span>
                  <ProductCard
                    product={item}
                    editable={false}
                    showDetails={false}
                    showFavorite={false}
                    showAddToCart={true}
                    showRemove={true}
                    showTotal={true}
                    onRemove={() => dispatch(removeFromCart(item.id))}
                  />
                </li>
              ))}
            </ul>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <div className="mb-2">
                <h5 className="mb-1">Total productos: {cartItems.length}</h5>
                <h6 className="text-muted">Unidades totales: {totalUnits}</h6>
              </div>
              <div className="text-end">
                <h4>
                  Total:{" "}
                  <span className="text-success">{total.toFixed(2)} USD</span>
                </h4>
                <button
                  className="btn btn-danger w-100"
                  onClick={() => dispatch(clearCart())}
                >
                  <i className="bi bi-trash3-fill"></i> Vaciar Carrito
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
