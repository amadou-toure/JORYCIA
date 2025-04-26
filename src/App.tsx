import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import AboutUs from "./pages/AboutUs";
import Cart from "./pages/Cart";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { CartProvider } from "./data/contexts/cart.context.tsx";
import { ProductProvider } from "./data/contexts/Product.context.tsx";
import ProductDetail from "./pages/ProductDetail";
import ProductManagement from "./pages/ProductManagement";

function AppRoutes() {
  const location = useLocation();
  const hideLayout =
    ["/LogIn", "/SignUp"].includes(location.pathname) ||
    location.pathname === "*";

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin/product/new" element={<ProductManagement />} />
        <Route path="/admin/product/:id" element={<ProductManagement />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
