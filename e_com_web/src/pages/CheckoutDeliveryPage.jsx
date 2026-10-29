import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import CheckoutStepper from "../components/CheckoutStepper";
import { formatPrice } from "../utils/helpers";
import {
  FiMapPin,
  FiUser,
  FiPhone,
  FiMail,
  FiHome,
  FiBriefcase,
  FiTruck,
  FiArrowRight,
  FiArrowLeft,
  FiShield,
  FiCheck,
  FiAlertCircle,
  FiZap,
  FiClock,
  FiPackage,
} from "react-icons/fi";

const DEMO_ADDRESSES = {
  home: {
    fullName: "Sachin Chaurasiya",
    phone: "9876543210",
    email: "sachin@example.com",
    address: "Flat 402, Green Orchid Heights, Hiranandani Estate, Ghodbunder Rd",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400607",
    addressType: "Home",
  },
  work: {
    fullName: "Sachin Chaurasiya",
    phone: "9876543210",
    email: "sachin.work@example.com",
    address: "7th Floor, Tech Innovation Hub, Outer Ring Road, Bellandur",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560103",
    addressType: "Work",
  },
};

const CheckoutDeliveryPage = () => {
  const {
    deliveryAddress,
    setDeliveryAddress,
    cartItems,
    cartSubtotal,
    shippingFee,
    discountAmount,
    appliedCoupon,
    finalTotal,
    setCurrentView,
    showToast,
  } = useShop();

  const [formData, setFormData] = useState({
    fullName: deliveryAddress.fullName || "",
    phone: deliveryAddress.phone || "",
    email: deliveryAddress.email || "",
    address: deliveryAddress.address || "",
    city: deliveryAddress.city || "",
    state: deliveryAddress.state || "",
    pincode: deliveryAddress.pincode || "",
    addressType: deliveryAddress.addressType || "Home",
    speed: deliveryAddress.speed || "standard",
  });

  const [errors, setErrors] = useState({});

  const handleQuickFill = (type) => {
    const preset = DEMO_ADDRESSES[type];
    if (preset) {
      setFormData((prev) => ({
        ...prev,
        ...preset,
      }));
      setErrors({});
      showToast(`Filled ${preset.addressType} address preset!`, "info");
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name (minimum 2 characters)";
    }
    if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      errs.phone = "Enter a valid 10-digit mobile number starting with 6-9";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.address.trim() || formData.address.trim().length < 8) {
      errs.address = "Please provide house no., street, and area details (min 8 chars)";
    }
    if (!formData.city.trim()) {
      errs.city = "City name is required";
    }
    if (!formData.state.trim()) {
      errs.state = "State is required";
    }
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode.trim())) {
      errs.pincode = "Please enter a valid 6-digit postal PIN code";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSpeedChange = (speed) => {
    setFormData((prev) => ({ ...prev, speed }));
    setDeliveryAddress((prev) => ({ ...prev, speed }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fill in all mandatory delivery fields correctly", "error");
      return;
    }
    setDeliveryAddress(formData);
    showToast("Delivery address saved!", "success");
    setCurrentView("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (cartItems.length === 0) {
    setCurrentView("cart");
    return null;
  }

  return (
    <div className="checkout-delivery-container container">
      <CheckoutStepper currentStep="delivery" />

      <div className="page-header">
        <div>
          <span className="eyebrow">STEP 2 OF 3 • SHIPPING DESTINATION</span>
          <h1 className="page-title">Delivery Details</h1>
          <p className="page-subtitle">
            Where should we send your order? Ensure your contact information is correct.
          </p>
        </div>
        <button
          className="text-link-btn"
          onClick={() => setCurrentView("cart")}
        >
          <FiArrowLeft /> Back to Cart
        </button>
      </div>

      <div className="checkout-layout-grid">
        {/* Left Column: Delivery Address Form */}
        <div className="checkout-main-form-col">
          <form className="delivery-form-card" onSubmit={handleSubmit} noValidate>
            <div className="form-section-title-wrap">
              <div className="form-section-title">
                <FiMapPin className="section-icon" />
                <h3>Shipping Information</h3>
              </div>

              {/* Quick Fill Demo Address Helper */}
              <div className="quick-fill-group">
                <span className="quick-fill-label">Quick Fill:</span>
                <button
                  type="button"
                  className="quick-fill-btn"
                  onClick={() => handleQuickFill("home")}
                >
                  <FiHome /> Home (Mumbai)
                </button>
                <button
                  type="button"
                  className="quick-fill-btn"
                  onClick={() => handleQuickFill("work")}
                >
                  <FiBriefcase /> Office (Bengaluru)
                </button>
              </div>
            </div>

            <p className="form-instruction">All fields marked with * are required.</p>

            <div className="form-fields-grid">
              {/* Full Name */}
              <div className="form-group full-width">
                <label className="field-label">
                  <FiUser className="label-icon" /> Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Sachin Chaurasiya"
                  className={`form-input ${errors.fullName ? "input-error" : ""}`}
                />
                {errors.fullName && (
                  <span className="error-text">
                    <FiAlertCircle /> {errors.fullName}
                  </span>
                )}
              </div>

              {/* Mobile Phone */}
              <div className="form-group">
                <label className="field-label">
                  <FiPhone className="label-icon" /> Mobile Number *
                </label>
                <div className="phone-input-wrap">
                  <span className="phone-prefix">+91</span>
                  <input
                    type="tel"
                    name="phone"
                    maxLength="10"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    className={`form-input phone-input ${errors.phone ? "input-error" : ""}`}
                  />
                </div>
                {errors.phone && (
                  <span className="error-text">
                    <FiAlertCircle /> {errors.phone}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label className="field-label">
                  <FiMail className="label-icon" /> Email Address (for tracking & receipt)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                />
                {errors.email && (
                  <span className="error-text">
                    <FiAlertCircle /> {errors.email}
                  </span>
                )}
              </div>

              {/* Street Address */}
              <div className="form-group full-width">
                <label className="field-label">
                  <FiHome className="label-icon" /> Flat, House No., Building, Street & Landmark *
                </label>
                <textarea
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. Flat 402, Green Orchid Apartments, Sector 18, Near Metro Station"
                  className={`form-textarea ${errors.address ? "input-error" : ""}`}
                ></textarea>
                {errors.address && (
                  <span className="error-text">
                    <FiAlertCircle /> {errors.address}
                  </span>
                )}
              </div>

              {/* City */}
              <div className="form-group">
                <label className="field-label">City / Town *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai"
                  className={`form-input ${errors.city ? "input-error" : ""}`}
                />
                {errors.city && (
                  <span className="error-text">
                    <FiAlertCircle /> {errors.city}
                  </span>
                )}
              </div>

              {/* State */}
              <div className="form-group">
                <label className="field-label">State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g. Maharashtra"
                  className={`form-input ${errors.state ? "input-error" : ""}`}
                />
                {errors.state && (
                  <span className="error-text">
                    <FiAlertCircle /> {errors.state}
                  </span>
                )}
              </div>

              {/* Pincode */}
              <div className="form-group">
                <label className="field-label">Postal Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  maxLength="6"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit PIN"
                  className={`form-input ${errors.pincode ? "input-error" : ""}`}
                />
                {errors.pincode && (
                  <span className="error-text">
                    <FiAlertCircle /> {errors.pincode}
                  </span>
                )}
              </div>

              {/* Address Type */}
              <div className="form-group">
                <label className="field-label">Address Tag</label>
                <div className="address-type-selector">
                  <button
                    type="button"
                    className={`type-tag-btn ${formData.addressType === "Home" ? "active" : ""}`}
                    onClick={() => setFormData((p) => ({ ...p, addressType: "Home" }))}
                  >
                    <FiHome /> Home
                  </button>
                  <button
                    type="button"
                    className={`type-tag-btn ${formData.addressType === "Work" ? "active" : ""}`}
                    onClick={() => setFormData((p) => ({ ...p, addressType: "Work" }))}
                  >
                    <FiBriefcase /> Work / Office
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Speed Options */}
            <div className="delivery-speed-section">
              <h4 className="speed-section-title">
                <FiTruck className="section-icon" /> Choose Delivery Speed
              </h4>
              <div className="speed-options-grid">
                <div
                  className={`speed-option-card ${formData.speed === "standard" ? "selected" : ""}`}
                  onClick={() => handleSpeedChange("standard")}
                >
                  <div className="speed-radio-indicator">
                    {formData.speed === "standard" && <div className="inner-dot"></div>}
                  </div>
                  <div className="speed-details">
                    <div className="speed-title-row">
                      <strong>Standard Free Delivery</strong>
                      <span className="speed-badge free">
                        {cartSubtotal >= 999 ? "FREE" : "₹49"}
                      </span>
                    </div>
                    <p className="speed-desc">Estimated delivery in 3 to 4 business days</p>
                  </div>
                </div>

                <div
                  className={`speed-option-card ${formData.speed === "express" ? "selected" : ""}`}
                  onClick={() => handleSpeedChange("express")}
                >
                  <div className="speed-radio-indicator">
                    {formData.speed === "express" && <div className="inner-dot"></div>}
                  </div>
                  <div className="speed-details">
                    <div className="speed-title-row">
                      <strong>Priority Express Delivery</strong>
                      <span className="speed-badge express">+₹99</span>
                    </div>
                    <p className="speed-desc">Guaranteed priority dispatch within 24 to 48 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dispatch Guarantee Box */}
            <div className="dispatch-guarantee-strip">
              <FiZap className="dispatch-icon" />
              <div>
                <strong>Same-Day Packaging & Dispatch</strong>
                <p>Orders received before 3:00 PM are packed and handed to premium couriers today.</p>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block proceed-to-pay-btn">
              Proceed to Payment Gateway <FiArrowRight />
            </button>
          </form>
        </div>

        {/* Right Column: Order Items & Total Summary */}
        <div className="checkout-summary-col">
          <div className="summary-card">
            <h3 className="summary-title">Order Items ({cartItems.length})</h3>
            <div className="mini-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="mini-item-row">
                  <img src={item.image} alt={item.name} className="mini-item-img" />
                  <div className="mini-item-info">
                    <span className="mini-item-name">{item.name}</span>
                    <span className="mini-item-qty">Qty: {item.qty} × {formatPrice(item.price)}</span>
                  </div>
                  <span className="mini-item-total">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-price-breakdown">
              <div className="price-line">
                <span>Items Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="price-line discount-line">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="green">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="price-line">
                <span>Shipping ({formData.speed === "express" ? "Express" : "Standard"})</span>
                <span>{shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}</span>
              </div>
              <div className="price-divider"></div>
              <div className="price-line grand-total-line">
                <span>Total to Pay</span>
                <span className="total-amount">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="guarantee-box">
              <FiShield className="guarantee-icon" />
              <div>
                <strong>Safe & Contactless Delivery</strong>
                <p>Every parcel is packaged with tamper-proof seal and sanitizer safety.</p>
              </div>
            </div>

            <div className="delivery-perks-list">
              <div className="perk-item">
                <FiCheck className="perk-check" />
                <span>Live WhatsApp & SMS order tracking updates</span>
              </div>
              <div className="perk-item">
                <FiCheck className="perk-check" />
                <span>Zero hassle doorstep replacement guarantee</span>
              </div>
              <div className="perk-item">
                <FiCheck className="perk-check" />
                <span>OTP verification before courier handover</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDeliveryPage;
