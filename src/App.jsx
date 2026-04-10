import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import { products } from "./data/products";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListingPage from "./pages/ProductListingPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import WishlistPage from "./pages/WishlistPage";
import {
  getStoredCart,
  getStoredOrders,
  getStoredUser,
  getStoredWishlist,
  storeCart,
  storeOrders,
  storeUser,
  storeWishlist,
} from "./utils/storage";

function RequireAuth({ currentUser, children }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function GuestOnly({ currentUser, children }) {
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(getStoredCart);
  const [wishlistItems, setWishlistItems] = useState(getStoredWishlist);
  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const [orders, setOrders] = useState(getStoredOrders);
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    storeCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    storeWishlist(wishlistItems);
  }, [wishlistItems]);

  useEffect(() => {
    storeUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    storeOrders(orders);
  }, [orders]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const wishlistCount = wishlistItems.length;

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  const addToCart = (product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      return [...currentItems, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId));
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) => (item.id === productId ? { ...item, quantity } : item)),
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    setWishlistItems((currentItems) => {
      const isSaved = currentItems.some((item) => item.id === product.id);
      return isSaved
        ? currentItems.filter((item) => item.id !== product.id)
        : [...currentItems, product];
    });
  };

  const placeOrder = (checkoutData) => {
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      items: cartItems,
      total: cartTotal,
      customer: checkoutData,
      status: "Processing",
    };

    setOrders((currentOrders) => [order, ...currentOrders]);
    setCartItems([]);

    return order;
  };

  const loginUser = (loginData) => {
    setCurrentUser({
      name: loginData.email.split("@")[0],
      email: loginData.email,
      phone: "+91 98765 43210",
      city: "New Delhi",
      membership: "Gold Member",
    });
  };

  const registerUser = (registerData) => {
    setCurrentUser({
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone || "+91 98765 43210",
      city: registerData.city || "Mumbai",
      membership: "New Member",
    });
  };

  const updateUser = (updatedFields) => {
    setCurrentUser((current) => (current ? { ...current, ...updatedFields } : current));
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  return (
    <>
      <ScrollToTop />
      {!isAuthPage ? (
        <Header
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          currentUser={currentUser}
          onLogout={logoutUser}
        />
      ) : null}
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth currentUser={currentUser}>
              <HomePage
                products={products}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlistItems={wishlistItems}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/products"
          element={
            <RequireAuth currentUser={currentUser}>
              <ProductListingPage
                products={products}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlistItems={wishlistItems}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/products/:productId"
          element={
            <RequireAuth currentUser={currentUser}>
              <ProductDetailsPage
                products={products}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlistItems={wishlistItems}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth currentUser={currentUser}>
              <CartPage
                cartItems={cartItems}
                cartTotal={cartTotal}
                onUpdateCartQuantity={updateCartQuantity}
                onRemoveFromCart={removeFromCart}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequireAuth currentUser={currentUser}>
              <CheckoutPage
                cartItems={cartItems}
                cartTotal={cartTotal}
                currentUser={currentUser}
                onPlaceOrder={placeOrder}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            <GuestOnly currentUser={currentUser}>
              <LoginPage onLogin={loginUser} />
            </GuestOnly>
          }
        />
        <Route
          path="/register"
          element={
            <GuestOnly currentUser={currentUser}>
              <RegisterPage onRegister={registerUser} />
            </GuestOnly>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth currentUser={currentUser}>
              <ProfilePage
                currentUser={currentUser}
                orders={orders}
                onLogout={logoutUser}
                onUpdateUser={updateUser}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/about"
          element={
            <RequireAuth currentUser={currentUser}>
              <AboutPage />
            </RequireAuth>
          }
        />
        <Route
          path="/contact"
          element={
            <RequireAuth currentUser={currentUser}>
              <ContactPage />
            </RequireAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequireAuth currentUser={currentUser}>
              <WishlistPage
                wishlistItems={wishlistItems}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <RequireAuth currentUser={currentUser}>
              <OrderHistoryPage orders={orders} />
            </RequireAuth>
          }
        />
        <Route
          path="/faq"
          element={
            <RequireAuth currentUser={currentUser}>
              <FaqPage />
            </RequireAuth>
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route
          path="*"
          element={currentUser ? <NotFoundPage /> : <Navigate to="/login" replace />}
        />
      </Routes>
      {!isAuthPage ? <Footer /> : null}
    </>
  );
}

export default App;
