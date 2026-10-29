import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import {
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiLock,
  FiArrowRight,
  FiCheckCircle,
  FiHeart,
  FiMail,
} from "react-icons/fi";

const Footer = () => {
  const { setCurrentView, setSelectedCategory, showToast } = useShop();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    setSubscribed(true);
    showToast("Thank you for subscribing! Check your inbox for ₹150 OFF coupon.", "success");
    setEmail("");
  };

  const handleNav = (view, cat = null) => {
    if (cat) setSelectedCategory(cat);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      {/* Trust Badges Bar */}
      <div className="footer-trust-strip">
        <div className="container trust-strip-grid">
          <div className="trust-card">
            <div className="trust-icon-box">
              <FiShield className="trust-icon" />
            </div>
            <div>
              <h4 className="trust-title">100% Verified Quality</h4>
              <p className="trust-desc">Carefully inspected authentic merchandise</p>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box">
              <FiTruck className="trust-icon" />
            </div>
            <div>
              <h4 className="trust-title">Express Delivery</h4>
              <p className="trust-desc">Free nationwide shipping on orders over ₹999</p>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box">
              <FiRefreshCw className="trust-icon" />
            </div>
            <div>
              <h4 className="trust-title">7-Day Easy Returns</h4>
              <p className="trust-desc">No-questions-asked doorstep pickup</p>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box">
              <FiLock className="trust-icon" />
            </div>
            <div>
              <h4 className="trust-title">Secure Encrypted Payments</h4>
              <p className="trust-desc">UPI, Cards, Netbanking & Cash on Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container footer-main-content">
        <div className="footer-col brand-col">
          <div className="brand-btn footer-brand" onClick={() => handleNav("home")}>
            <div className="brand-logo-wrap">
              <FiShoppingBag className="brand-icon" />
            </div>
            <div className="brand-text">
              <span className="brand-title">ShopKart</span>
              <span className="brand-sub">Curated Living</span>
            </div>
          </div>
          <p className="footer-bio">
            Discover modern design, thoughtful technology, and lifestyle essentials crafted to elevate every part of your routine.
          </p>
          <div className="newsletter-box">
            <h5 className="newsletter-title">
              <FiMail className="newsletter-icon" /> Stay in the loop
            </h5>
            <p className="newsletter-sub">Get secret coupons and early access to drops.</p>
            {subscribed ? (
              <div className="subscribed-badge">
                <FiCheckCircle /> Subscribed with coupon code <strong>FIRSTBUY</strong>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                  <FiArrowRight />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Shop Categories</h4>
          <ul className="footer-links-list">
            <li>
              <button onClick={() => handleNav("products", "Electronics")}>Electronics & Audio</button>
            </li>
            <li>
              <button onClick={() => handleNav("products", "Fashion")}>Apparel & Footwear</button>
            </li>
            <li>
              <button onClick={() => handleNav("products", "Home & Living")}>Home & Living</button>
            </li>
            <li>
              <button onClick={() => handleNav("products", "Accessories")}>Bags & Carry Gear</button>
            </li>
            <li>
              <button onClick={() => handleNav("products", "Beauty & Wellness")}>Skincare & Wellness</button>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Customer Care</h4>
          <ul className="footer-links-list">
            <li>
              <button onClick={() => handleNav("delivery")}>Delivery Coverage</button>
            </li>
            <li>
              <button onClick={() => handleNav("cart")}>Shopping Cart</button>
            </li>
            <li>
              <button onClick={() => handleNav("orders")}>Track Recent Orders</button>
            </li>
            <li>
              <button onClick={() => showToast("24/7 Support line: support@shopkart.in", "info")}>Help Center & FAQ</button>
            </li>
            <li>
              <button onClick={() => showToast("Returns portal is active 7 days post delivery", "info")}>Return & Exchange Policy</button>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Payment Options</h4>
          <p className="footer-payment-note">
            We support all major payment providers across India:
          </p>
          <div className="payment-pill-list">
            <span className="payment-pill">UPI / QR</span>
            <span className="payment-pill">Google Pay</span>
            <span className="payment-pill">PhonePe</span>
            <span className="payment-pill">Paytm</span>
            <span className="payment-pill">Visa / Mastercard</span>
            <span className="payment-pill">Net Banking</span>
            <span className="payment-pill">Cash on Delivery</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} ShopKart India. All rights reserved. Built with React & Pure Modern CSS.
          </p>
          <p className="footer-credit">
            Crafted with <FiHeart className="heart-icon" /> for exceptional online shopping.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
