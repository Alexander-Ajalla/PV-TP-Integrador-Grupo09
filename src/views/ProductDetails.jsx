// src/views/ProductDetail.jsx
import { useParams, Link, useNavigate } from "react-router-dom"; // Asegúrate de importar Link
import { useSelector, useDispatch } from "react-redux";
import FavoriteToggle from "../components/FavoriteToggle";
import { deleteProduct } from "../store/productSlice";

function ProductDetail() {
  const { id } = useParams();

  const navigate = useNavigate(); // Inicializa useNavigate
  const dispatch = useDispatch(); // Inicializa useDispatch

  const products = useSelector((state) => state.products.products);

  const product = products.find((p) => p.id == id);

  // Función para manejar la eliminación
  const handleDelete = () => {
    // Pedir confirmación al usuario
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar "${product.title}"?`
      )
    ) {
      dispatch(deleteProduct(product.id)); // Despacha la acción de eliminar con el ID del producto
      navigate("/"); // Redirige al Home después de eliminar
    }
  };

  if (!product) {
    return (
      <div className="container py-5">
        <h1 className="display-4 fw-bold mb-4">Producto no encontrado</h1>
        <Link to="/" className="btn btn-primary">
          <i className="bi bi-arrow-left me-2"></i>Volver al Inicio
        </Link>
      </div>
    );
  }
  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        <i className="bi bi-arrow-left me-2"></i>Volver al Inicio
      </Link>
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="display-5 fw-bold mb-3">{product.title}</h1>
          <p className="text-muted mb-2">Categoría: {product.category}</p>
          <p className="lead mb-4">{product.description}</p>
          <h3 className="text-success mb-4">${product.price}</h3>
          <div className="d-flex gap-3">
            <FavoriteToggle productId={product.id} />
            <Link
              to={`/productos/${product.id}/editar`}
              className="btn btn-outline-primary"
            >
              <i className="bi bi-pencil me-2"></i>Editar Producto
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              <i className="bi bi-trash me-2"></i>Eliminar Producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
