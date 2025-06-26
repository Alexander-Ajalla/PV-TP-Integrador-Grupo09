import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FavoriteToggle from "../components/FavoriteToggle";
import { deleteProduct } from "../store/productSlice";
import "../css/ProductDetail.css"; 

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const product = products.find((p) => p.id == id);

  const handleDelete = () => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar "${product.title}"?`
      )
    ) {
      dispatch(deleteProduct(product.id));
      navigate("/");
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
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card product-detail-card shadow-lg border-0">
            <div className="row g-0 align-items-center">
              <div className="col-md-5 text-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid rounded product-detail-img"
                />
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <h1 className="product-detail-title mb-3">{product.title}</h1>
                  <span className="badge bg-info mb-2 fs-6">
                    {product.category}
                  </span>
                  <p className="product-detail-desc mb-4">{product.description}</p>
                  <h2 className="product-detail-price mb-4">
                    ${product.price}
                  </h2>
                  <div className="d-flex gap-3 mb-3">
                    <FavoriteToggle productId={product.id} />
                    <Link
                      to={`/productos/${product.id}/editar`}
                      className="btn btn-outline-primary"
                    >
                      <i className="bi bi-pencil me-2"></i>Editar
                    </Link>
                    <button onClick={handleDelete} className="btn btn-danger">
                      <i className="bi bi-trash me-2"></i>Eliminar
                    </button>
                  </div>
                  <Link to="/" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i>Volver al Inicio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default ProductDetail;