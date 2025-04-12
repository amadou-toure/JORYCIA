
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collections from './pages/Collections';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import {CartProvider} from './data/contexts/cart.context.tsx';
import {ProductProvider} from "./data/contexts/Product.context.tsx";


function App() {

  return (
      <ProductProvider>
          <CartProvider>
              <Router>
                  <div className="min-h-screen bg-[#f8f5f1]">
                      <Navbar />
                      <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/collections" element={<Collections />} />
                          <Route path="/about" element={<AboutUs />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/cart" element={<Cart />} />
                      </Routes>
                  </div>
              </Router>
          </CartProvider>
      </ProductProvider>

  );
}

export default App;