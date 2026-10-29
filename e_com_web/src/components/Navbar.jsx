import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import {
  FiShoppingBag,
  FiShoppingCart,
  FiSearch,
  FiMapPin,
  FiPackage,
  FiMenu,
  FiX,
  FiClock,
  FiChevronRight,
} from "react-icons/fi";

const Navbar = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    deliveryAddress,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    ordersHistory,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentView("products");
    setMobileMenuOpen(false);
  };

  const navigateTo = (view, category = null) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="site-header">
      {/* Top Notification Bar */}
      <div className="top-banner">
        <div className="container top-banner-content">
          <div className="top-banner-item">
            <FiClock className="top-icon" />
            <span>Flash Deal: Free express delivery on orders over ₹999</span>
          </div>
          <div className="top-banner-right">
            <span>Use coupon <strong>SAVE10</strong> for 10% off</span>
          </div>
        </div>
      </div>

      <div className="container nav-wrap">
        {/* Brand */}
        <button
          className="brand-btn"
          onClick={() => navigateTo("home")}
          aria-label="ShopKart Home"
        >
          <div className="brand-logo-wrap">
            <FiShoppingBag className="brand-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-title">ShopKart</span>
            <span className="brand-sub">Curated Living</span>
          </div>
        </button>

        {/* Search Bar */}
        <form className="nav-search-form" onSubmit={handleSearchSubmit}>
          <FiSearch className="search-icon" />
          <input
            type="search"
            placeholder="Search headphones, mugs, backpacks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="nav-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery("")}
            >
              <FiX />
            </button>
          )}
        </form>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <button
            className={`nav-link ${currentView === "home" ? "active" : ""}`}
            onClick={() => navigateTo("home")}
          >
            Home
          </button>
          <button
            className={`nav-link ${
              currentView === "products" && selectedCategory === "All" ? "active" : ""
            }`}
            onClick={() => {
              setSelectedCategory("All");
              navigateTo("products");
            }}
          >
            Shop All
          </button>
          <button
            className={`nav-link ${
              currentView === "products" && selectedCategory === "Electronics" ? "active" : ""
            }`}
            onClick={() => navigateTo("products", "Electronics")}
          >
            Tech
          </button>
          <button
            className={`nav-link ${
              currentView === "products" && selectedCategory === "Fashion" ? "active" : ""
            }`}
            onClick={() => navigateTo("products", "Fashion")}
          >
            Fashion
          </button>
          <button
            className={`nav-link ${
              currentView === "products" && selectedCategory === "Home & Living" ? "active" : ""
            }`}
            onClick={() => navigateTo("products", "Home & Living")}
          >
            Home & Living
          </button>
          <button
            className={`nav-link ${
              currentView === "products" && selectedCategory === "Accessories" ? "active" : ""
            }`}
            onClick={() => navigateTo("products", "Accessories")}
          >
            Accessories
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          {/* Location Indicator */}
          {deliveryAddress.city && (
            <div
              className="location-pill"
              title={`Deliver to ${deliveryAddress.city}, ${deliveryAddress.pincode}`}
              onClick={() => navigateTo("delivery")}
            >
              <FiMapPin className="loc-icon" />
              <div className="loc-text">
                <span className="loc-label">Deliver to</span>
                <span className="loc-city">{deliveryAddress.city}</span>
              </div>
            </div>
          )}

          {/* Orders History Quick Access */}
          {ordersHistory.length > 0 && (
            <button
              className="icon-action-btn"
              title="Order History"
              onClick={() => navigateTo("orders")}
              aria-label="Order History"
            >
              <FiPackage className="action-icon" />
              <span className="order-badge">{ordersHistory.length}</span>
            </button>
          )}

          {/* Cart Button */}
          <button
            className={`cart-button ${currentView === "cart" ? "active" : ""}`}
            onClick={() => navigateTo("cart")}
            aria-label="View Shopping Cart"
          >
            <div className="cart-icon-container">
              <FiShoppingCart className="cart-svg-icon" />
              <span className="cart-badge-count">{cartCount}</span>
            </div>
            <span className="cart-label">Cart</span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
            <FiSearch className="search-icon" />
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="nav-search-input"
            />
          </form>
          <div className="mobile-links">
            <button
              className={`mobile-nav-link ${currentView === "home" ? "active" : ""}`}
              onClick={() => navigateTo("home")}
            >
              Home <FiChevronRight />
            </button>
            <button
              className={`mobile-nav-link ${
                currentView === "products" && selectedCategory === "All" ? "active" : ""
              }`}
              onClick={() => {
                setSelectedCategory("All");
                navigateTo("products");
              }}
            >
              Shop All Products <FiChevronRight />
            </button>
            <button
              className={`mobile-nav-link ${
                currentView === "products" && selectedCategory === "Electronics" ? "active" : ""
              }`}
              onClick={() => navigateTo("products", "Electronics")}
            >
              Tech & Audio <FiChevronRight />
            </button>
            <button
              className={`mobile-nav-link ${
                currentView === "products" && selectedCategory === "Fashion" ? "active" : ""
              }`}
              onClick={() => navigateTo("products", "Fashion")}
            >
              Fashion & Apparel <FiChevronRight />
            </button>
            <button
              className={`mobile-nav-link ${
                currentView === "products" && selectedCategory === "Home & Living" ? "active" : ""
              }`}
              onClick={() => navigateTo("products", "Home & Living")}
            >
              Home & Living <FiChevronRight />
            </button>
            <button
              className={`mobile-nav-link ${
                currentView === "products" && selectedCategory === "Accessories" ? "active" : ""
              }`}
              onClick={() => navigateTo("products", "Accessories")}
            >
              Accessories & Carry <FiChevronRight />
            </button>
            <button
              className={`mobile-nav-link ${
                currentView === "products" && selectedCategory === "Beauty & Wellness" ? "active" : ""
              }`}
              onClick={() => navigateTo("products", "Beauty & Wellness")}
            >
              Beauty & Wellness <FiChevronRight />
            </button>
            {ordersHistory.length > 0 && (
              <button
                className="mobile-nav-link"
                onClick={() => navigateTo("orders")}
              >
                My Orders ({ordersHistory.length}) <FiChevronRight />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
