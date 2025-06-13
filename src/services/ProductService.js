const API_URL = "https://fakestoreapi.com/products";

export const getProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    console.log("La respuesta de la red no fue correcta.");
  }
  const data = await response.json();
  return data;
};
