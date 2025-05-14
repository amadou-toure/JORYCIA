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
import { OrderProvider } from "./contexts/Order.context.tsx";
import Register from "./pages/Register.tsx";
import SuccessPayment from "./pages/SuccessPayment.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import OrderManagement from "./pages/admin/OrderManagement.tsx";
import { UserProvider } from "./contexts/user.context.tsx";
import UserManagement from "./pages/admin/UserManagement.tsx";
import Orders from "./pages/Orders.tsx";
import OrderDetail from "./pages/OrderDetail";
import { PaymentProvider } from "./contexts/payment.context.tsx";
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
          path="/admin/product"
          element={
            <RequireAdmin>
              <ProductManagement />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/user/"
          element={
            <RequireAdmin>
              <UserManagement />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <RequireAdmin>
              <OrderManagement />
            </RequireAdmin>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/success" element={<SuccessPayment />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
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
          <PaymentProvider>
            <OrderProvider>
              <Router>
                <AppRoutes />
              </Router>
            </OrderProvider>
          </PaymentProvider>
        </ProductProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
