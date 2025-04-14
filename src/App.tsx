
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collections from './pages/Collections';
import AboutUs from './pages/AboutUs';
import Cart from './pages/Cart';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import {CartProvider} from './data/contexts/cart.context.tsx';
import {ProductProvider} from "./data/contexts/Product.context.tsx";


function App() {

  return (

          <CartProvider>
              <ProductProvider>
              <Router>
                  <div className="min-h-screen bg-[#f8f5f1]">
                      <Navbar />
                      <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/collections" element={<Collections />} />
                          <Route path="/LogIn" element={<LogIn />} />
                          <Route path="/SingUp" element={<SignUp />} />
                          <Route path="/about" element={<AboutUs />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="*" element={<NotFound />} />
                      </Routes>
                      <Footer />
                  </div>
              </Router>
              </ProductProvider>
          </CartProvider>


  );
}

export default App;