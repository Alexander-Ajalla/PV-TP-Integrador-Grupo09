import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NavBar from './components/NavBar.jsx';
import Home from "./views/Home.jsx";
import Favorites from './views/Favorites.jsx';

// import ProductDetails from './views/ProductDetails.jsx';
// import ProductForm from './views/ProductForm.jsx';
// import About from './views/About.jsx';

// import Footer from './components/Footer'; // * Por si agregamos un footer
function App() {
  return (
      <div className="d-flex flex-column min-vh-100">
        {/* <NavBar /> */}
        <main className="flex-grow-1 container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favorites/>}/>
            {/* <Route path="/productos/:id" element={<ProductDetails />} />
            <Route path="/productos/nuevo" element={<ProductForm />} />
            <Route path="/productos/:id/editar" element={<ProductForm />} />
            <Route path="/acerca" element={<About />} /> */}
          </Routes>
        </main>
        {/* <Footer />  */}
      </div>
  );
}
export default App;
