import { useState } from "react"; //? Para controlar localmente la cantidad del producto a agregar
import FavoriteToggle from "./FavoriteToggle"; //? Para enviar acciones a Redux (como agregar al carrito).
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice"; //? Acción Redux que agrega productos al carrito.
import { Link } from "react-router-dom"; //? Para navegar sin recargar la página.
import toast from "react-hot-toast"; //? Para mostrar notificaciones visuales.
import "../css/ProductCard.css";

// * Props del producto
// editable //? Si se muestra el boton editar
//  showAddToCart // ? Si se muestra el input de cantidad y botón "Añadir"
//  showRemove // ? Si se muestra el botón "Quitar del Carrito"
//  showFavorite // ? Si se muestra el botón de favoritos
//  showDetails // ? Si se muestra el botón de "Ver más detalles"
//  showTotal // ? Si se muestra el precio total (cantidad * precio)
//  onRemove // ? Función a ejecutar al quitar el producto (callback)
const ProductCard = ({
  product,
  editable = true,
  showAddToCart = true,
  showRemove = false,
  showFavorite = true,
  showDetails = true,
  showTotal = false,
  onRemove,
}) => {
  const dispatch = useDispatch();
  // * Estado local (cantidad)
  const [quantity, setQuantity] = useState(1);

  // * Función: Agregar al carrito
  // ? dispra addToCart, pasando el prod y la cant
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: Number(quantity) }));
    toast.success(`¡${product.title} añadido al carrito!`);
  };

  return (
    <div className="card product-card">
      <div className="product-card-img-container">
        <img src={product.image} alt={product.title} className="img-fluid" />
      </div>
      {/* Cuerpo del card: titulo, precio y categoria */}
      <div className="product-card-body">
        <h5 className="product-card-title">
          <strong>{product.title}</strong>
        </h5>
        <p className="product-card-price">
          Precio Unitario: {product.price} USD
        </p>
        {/* Precio total: suma la cant de productos al carrito*/}
        {showTotal && (
          <p className="product-card-price">
            Precio Total: {(product.quantity * product.price).toFixed(2)} USD
          </p>
        )}
        <p className="product-card-category">{product.category}</p>
        {/* Botones - Acciones */}
        <div className="product-card-footer">
          {/* // * Navega a /productos/id */}
          {showDetails && (
            <Link
              to={`/productos/${product.id}`}
              className="btn btn-outline-primary btn-sm"
            >
              Ver más detalles
            </Link>
          )}
          {/* // * Renderiza el componente favoriteToggle */}
          {showFavorite && <FavoriteToggle productId={product.id} />}
          {/* // * Navega a /productos/id/editar */}
          {editable && (
            <Link
              to={`/productos/${product.id}/editar`}
              className="btn btn-outline-warning btn-sm"
            >
              Editar
            </Link>
          )}
          {/* // * Elegir cantidad + añadir al carrito - Usa AddToCart */}
          {showAddToCart && (
            <label>
              Cantidad:
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control mb-2"
              />
              <button
                className="btn btn-success w-100"
                onClick={handleAddToCart}
              >
                <i className="bi bi-cart-plus-fill"></i>
                Añadir al Carrito
              </button>
            </label>
          )}
          {/* // * Quitar del carrito - Ejecuta onRemove() */}
          {showRemove && (
            <button className="btn btn-danger btn-sm w-100" onClick={onRemove}>
              <i className="bi bi-x-circle-fill"></i> Quitar del Carrito
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
