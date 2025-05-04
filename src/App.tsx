import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { RequireAdmin } from "./contexts/user.context.tsx";
import Collections from "./pages/Collections";
import AboutUs from "./pages/AboutUs";
import Cart from "./pages/Cart";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { CartProvider } from "./contexts/cart.context.tsx";
import { ProductProvider } from "./contexts/Product.context.tsx";
import ProductDetail from "./pages/ProductDetail";
import ProductManagement from "./pages/admin/ProductManagement.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import { UserProvider } from "./contexts/user.context.tsx";

function AppRoutes() {
  const location = useLocation();
  const hideLayout =
    ["/LogIn", "/SignUp"].includes(location.pathname) ||
    location.pathname === "*";

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <Dashboard />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/product/new"
          element={
            <RequireAdmin>
              <ProductManagement />
            </RequireAdmin>
          }
        />

        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
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
    <UserProvider>
      <CartProvider>
        <ProductProvider>
          <Router>
            <AppRoutes />
          </Router>
        </ProductProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
