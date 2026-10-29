import React from "react";
import { ShopProvider, useShop } from "./context/ShopContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import ProductModal from "./components/ProductModal";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutDeliveryPage from "./pages/CheckoutDeliveryPage";
import PaymentGatewayPage from "./pages/PaymentGatewayPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrdersHistoryPage from "./pages/OrdersHistoryPage";
import "./App.css";

const MainContent = () => {
  const { currentView } = useShop();

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomePage />;
      case "products":
        return <ProductsPage />;
      case "cart":
        return <CartPage />;
      case "delivery":
        return <CheckoutDeliveryPage />;
      case "payment":
        return <PaymentGatewayPage />;
      case "success":
        return <OrderSuccessPage />;
      case "orders":
        return <OrdersHistoryPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">{renderCurrentView()}</main>
      <ProductModal />
      <Toast />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}

export default App;