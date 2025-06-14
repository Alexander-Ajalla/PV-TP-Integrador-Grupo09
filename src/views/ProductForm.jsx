// src/views/ProductForm.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../store/productSlice";
import "../css/ProductForm.css";

function ProductForm() {
  // 1. Hooks de React Router DOM
  // `useParams` nos permite acceder a los parámetros de la URL. Si estamos en /productos/:id/editar, `id` tendrá el valor.
  const { id } = useParams();
  // `useNavigate` nos permite navegar programáticamente (por ejemplo, redirigir después de enviar el formulario).
  const navigate = useNavigate();

  // 2. Hooks de Redux
  // `useDispatch` nos da acceso a la función `dispatch` para enviar acciones al store de Redux.
  const dispatch = useDispatch();
  // `useSelector` nos permite extraer datos del estado de Redux.
  // Aquí obtenemos la lista completa de productos para poder buscar el producto a editar.
  const products = useSelector((state) => state.products.products);

  // 3. Estado Local del Formulario
  // `formData` almacena los valores de los campos del formulario.
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  // `errors` almacena los mensajes de error para la validación del formulario.
  const [errors, setErrors] = useState({});

  // 4. Lógica para determinar si estamos Editando o Creando
  // `isEditing` será `true` si el `id` existe en los parámetros de la URL, `false` si estamos creando.
  const isEditing = !!id; // El doble negación (!!) convierte cualquier valor a un booleano.

  // 5. `useEffect` para precargar datos en modo Edición
  // Este efecto se ejecuta cuando el componente se monta o cuando `id`, `isEditing`, `products` o `Maps` cambian.
  useEffect(() => {
    if (isEditing) {
      // Si estamos editando, buscamos el producto en nuestra lista de productos del store de Redux.
      // Usamos `==` para comparar `id` (que es string) con `product.id` (que puede ser number) de forma flexible.
     const productToEdit = products.find(p => p.id == id); 
      if (productToEdit) {
        // Si el producto se encuentra, precargamos el estado del formulario con sus datos.
        setFormData({
          title: productToEdit.title,
          // Convertimos el precio a string para el input de tipo "number", ya que `value` espera un string.
          price: productToEdit.price.toString(),
          description: productToEdit.description,
          image: productToEdit.image,
          category: productToEdit.category,
        });
      } else {
        // Si el ID en la URL no corresponde a ningún producto, redirigimos al usuario a la página de inicio.
        console.warn(`Producto con ID ${id} no encontrado. Redirigiendo.`);
        navigate("/");
      }
    }
    // El array de dependencias asegura que el efecto se re-ejecute solo cuando estas variables cambien.
  }, [id, isEditing, products, navigate]);

  // 6. Manejador de Cambios en los Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Actualizamos el estado del formulario con el nuevo valor del input.
    setFormData((prevData) => ({
      ...prevData, // Mantenemos los demás campos del formulario.
      [name]: value, // Actualizamos el campo específico por su nombre.
    }));
    // Opcional: limpiar el error del campo al que se está escribiendo
    // setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  // 7. Función de Validación del Formulario
  const validateForm = () => {
    const newErrors = {}; // Objeto para acumular los errores.

    // Validaciones de cada campo
    if (!formData.title.trim()) {
      newErrors.title = "El título es obligatorio.";
    }
    if (
      !formData.price ||
      isNaN(formData.price) ||
      parseFloat(formData.price) <= 0
    ) {
      newErrors.price = "El precio debe ser un número positivo.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria.";
    }
    // Fragmento de validateForm en ProductForm.jsx
    if (!formData.image.trim()) {
      newErrors.image = "La URL de la imagen es obligatoria.";
    } else if (
      !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.image)
    ) {
      // Esta regex es una validación básica para URLs que terminan en extensiones de imagen comunes.
      newErrors.image =
        "La URL de la imagen no es válida (solo .jpg, .jpeg, .png, .gif, .webp).";
    }
    if (!formData.category.trim()) {
      newErrors.category = "La categoría es obligatoria.";
    }

    setErrors(newErrors); // Actualizamos el estado de errores.
   
     console.log("Errores de validación:", newErrors); // Agrega este log

    return Object.keys(newErrors).length === 0;
  };

  // 8. Manejador de Envío del Formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página).

    console.log("handleSubmit se ejecutó.");

    if (!validateForm()) {
      // Si la validación falla, detenemos el envío del formulario.
       console.log("Validación falló, no se despachará la acción.");
      return;
    }

    // Preparamos los datos del producto.
    // Aseguramos que el precio sea un número flotante.
    console.log("Formulario válido. Preparando datos del producto...");
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };
    console.log("Datos del producto a despachar:", productData);

    if (isEditing) {
      // Si estamos editando, enviamos la acción `updateProduct` con el ID y los datos actualizados.
      dispatch(updateProduct({ id: parseInt(id), updatedData: productData }));
      console.log("Despachando updateProduct."); 
    } else {
      // `addProduct` en tu slice ya genera el ID, solo necesita los datos del nuevo producto.
      dispatch(addProduct(productData));
      console.log("Despachando addProduct con datos:", productData);
    }

    // Después de guardar, redirigimos al usuario a la página de inicio.
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">
                {isEditing ? "Editar Producto" : "Crear Nuevo Producto"}
              </h1>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Título:
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Precio:
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    className={`form-control ${
                      errors.price ? "is-invalid" : ""
                    }`}
                  />
                  {errors.price && (
                    <div className="invalid-feedback">{errors.price}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descripción:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    URL de la Imagen:
                  </label>
                  <input
                    type="text" 
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.image ? "is-invalid" : ""
                    }`}
                  />
                  {errors.image && (
                    <div className="invalid-feedback">{errors.image}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Categoría:
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.category ? "is-invalid" : ""
                    }`}
                  />
                  {errors.category && (
                    <div className="invalid-feedback">{errors.category}</div>
                  )}
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="btn btn-secondary me-md-2"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? "Guardar Cambios" : "Crear Producto"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
