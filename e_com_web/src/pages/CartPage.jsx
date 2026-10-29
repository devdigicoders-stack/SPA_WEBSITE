import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import CheckoutStepper from "../components/CheckoutStepper";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "../utils/helpers";
import {
  FiShoppingCart,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowRight,
  FiArrowLeft,
  FiTag,
  FiTruck,
  FiShield,
  FiCheck,
  FiX,
  FiAward,
  FiGift,
  FiLock,
  FiRefreshCw,
} from "react-icons/fi";

const CartPage = () => {
  const {
    products,
    cartItems,
    cartSubtotal,
    shippingFee,
    discountAmount,
    appliedCoupon,
    finalTotal,
    updateCartQty,
    removeFromCart,
    clearCart,
    addToCart,
    applyCouponCode,
    removeCoupon,
    setCurrentView,
    setSelectedCategory,
  } = useShop();

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState(null);

  const amountNeededForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - cartSubtotal
  );
  const freeShippingProgress = Math.min(
    100,
    Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  // Suggested add-ons: products not in cart
  const cartProductIds = new Set(cartItems.map((item) => item.id));
  const suggestedAddons = products
    .filter((p) => !cartProductIds.has(p.id))
    .slice(0, 3);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput("");
    }
  };

  const handleProceedToDelivery = () => {
    setCurrentView("delivery");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-page container">
        <CheckoutStepper currentStep="cart" />
        <div className="empty-cart-card">
          <div className="empty-cart-icon-box">
            <FiShoppingCart className="empty-cart-svg" />
          </div>
          <h2 className="empty-cart-title">Your shopping cart is empty</h2>
          <p className="empty-cart-text">
            Looks like you haven't added anything to your cart yet. Explore our
            handpicked collections and discover something you'll love!
          </p>
          <div className="empty-cart-cat-shortcuts">
            <button
              className="cat-chip-btn"
              onClick={() => {
                setSelectedCategory("Electronics");
                setCurrentView("products");
              }}
            >
              Explore Tech & Audio
            </button>
            <button
              className="cat-chip-btn"
              onClick={() => {
                setSelectedCategory("Fashion");
                setCurrentView("products");
              }}
            >
              Shop Fashion
            </button>
            <button
              className="cat-chip-btn"
              onClick={() => {
                setSelectedCategory("Home & Living");
                setCurrentView("products");
              }}
            >
              Browse Home & Living
            </button>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedCategory("All");
              setCurrentView("products");
            }}
          >
            Start Shopping <FiArrowRight />
          </button>
        </div>
      </div>
    );
  }

  // Calculate estimated savings
  const estimatedSavings = discountAmount + (shippingFee === 0 ? 99 : 0);
  const rewardCoins = Math.round(finalTotal * 0.05);

  return (
    <div className="cart-page-container container">
      {/* Checkout Stepper */}
      <CheckoutStepper currentStep="cart" />

      {/* Page Heading */}
      <div className="cart-page-header">
        <div>
          <span className="eyebrow">YOUR BASKET</span>
          <h1 className="page-title">Review Your Cart</h1>
          <p className="page-subtitle">
            You have <strong>{cartItems.length}</strong> unique{" "}
            {cartItems.length === 1 ? "item" : "items"} in your order.
          </p>
        </div>
        <button
          className="text-link-btn"
          onClick={() => {
            setSelectedCategory("All");
            setCurrentView("products");
          }}
        >
          <FiArrowLeft /> Continue Shopping
        </button>
      </div>

      {/* Free Delivery Goal Meter */}
      <div className="free-shipping-card">
        <div className="free-shipping-header">
          <div className="free-shipping-icon-wrap">
            <FiTruck className="shipping-icon" />
          </div>
          <div>
            {amountNeededForFreeShipping === 0 ? (
              <span className="free-shipping-status success">
                <FiCheck className="inline-check" /> You unlocked <strong>FREE Delivery</strong> on this order!
              </span>
            ) : (
              <span className="free-shipping-status">
                Add <strong>{formatPrice(amountNeededForFreeShipping)}</strong> more to unlock <strong>FREE Delivery</strong>
              </span>
            )}
          </div>
        </div>
        <div className="shipping-progress-track">
          <div
            className="shipping-progress-bar"
            style={{ width: `${freeShippingProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Two Column Layout: Cart Items & Order Summary */}
      <div className="cart-layout-grid">
        {/* Left Column: Items List */}
        <div className="cart-items-column">
          <div className="cart-items-card">
            <div className="cart-table-head">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Price</span>
              <span></span>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-row">
                  {/* Thumbnail & Title */}
                  <div className="item-info-col">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-thumbnail"
                    />
                    <div className="item-text">
                      <span className="item-category">{item.category}</span>
                      <h4 className="item-title">{item.name}</h4>
                      <span className="item-unit-price">
                        {formatPrice(item.price)} each
                      </span>
                    </div>
                  </div>

                  {/* Quantity Adjustment */}
                  <div className="item-qty-col">
                    <div className="qty-stepper">
                      <button
                        className="qty-step-btn"
                        onClick={() => updateCartQty(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        <FiMinus />
                      </button>
                      <span className="qty-val">{item.qty}</span>
                      <button
                        className="qty-step-btn"
                        onClick={() => updateCartQty(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="item-total-col">
                    <span className="item-total-price">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <div className="item-remove-col">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-card-footer">
              <button className="clear-cart-btn" onClick={clearCart}>
                <FiTrash2 /> Clear Entire Cart
              </button>
              <span className="secure-badge">
                <FiShield /> 256-Bit Bank-Grade Checkout
              </span>
            </div>
          </div>

          {/* Frequently Paired Add-Ons */}
          {suggestedAddons.length > 0 && (
            <div className="suggested-addons-card">
              <div className="addons-header">
                <div>
                  <h3 className="addons-title">Frequently Paired Essentials</h3>
                  <p className="addons-subtitle">
                    Add popular curated items to your order with a single click.
                  </p>
                </div>
                <span className="addons-badge">
                  <FiGift /> BEST VALUES
                </span>
              </div>

              <div className="addons-grid">
                {suggestedAddons.map((addon) => (
                  <div key={addon.id} className="addon-item-box">
                    <img
                      src={addon.image}
                      alt={addon.name}
                      className="addon-img"
                    />
                    <div className="addon-details">
                      <h4 className="addon-name">{addon.name}</h4>
                      <span className="addon-cat">{addon.category}</span>
                      <div className="addon-price-row">
                        <span className="addon-price">
                          {formatPrice(addon.price)}
                        </span>
                        {addon.oldPrice && (
                          <span className="addon-old-price">
                            {formatPrice(addon.oldPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      className="btn btn-outline btn-sm addon-add-btn"
                      onClick={() => addToCart(addon.id, 1)}
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary & Coupon */}
        <div className="cart-summary-column">
          {/* Coupon Box */}
          <div className="summary-card coupon-card">
            <h3 className="summary-title">
              <FiTag className="icon-gold" /> Apply Coupon Code
            </h3>
            {appliedCoupon ? (
              <div className="applied-coupon-pill">
                <div className="coupon-info">
                  <span className="code-text">{appliedCoupon.code}</span>
                  <small className="code-desc">{appliedCoupon.description}</small>
                </div>
                <button
                  type="button"
                  className="remove-coupon-btn"
                  onClick={removeCoupon}
                  title="Remove coupon"
                >
                  <FiX />
                </button>
              </div>
            ) : (
              <form className="coupon-form" onSubmit={handleApplyCoupon}>
                <div className="coupon-input-wrap">
                  <input
                    type="text"
                    placeholder="Enter SAVE10 or FIRSTBUY"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="coupon-input"
                  />
                  <button type="submit" className="coupon-apply-btn">
                    Apply
                  </button>
                </div>
                {couponFeedback && !couponFeedback.success && (
                  <p className="coupon-feedback error">{couponFeedback.message}</p>
                )}
              </form>
            )}
            <div className="suggested-coupons">
              <span className="suggested-label">Try popular offers:</span>
              <div className="coupons-chips">
                <button
                  type="button"
                  className="coupon-chip"
                  onClick={() => applyCouponCode("SAVE10")}
                >
                  SAVE10 (10% OFF)
                </button>
                <button
                  type="button"
                  className="coupon-chip"
                  onClick={() => applyCouponCode("FIRSTBUY")}
                >
                  FIRSTBUY (₹150 OFF)
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown Card */}
          <div className="summary-card price-breakdown-card">
            <h3 className="summary-title">Order Price Summary</h3>
            <div className="price-lines">
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
                <span>Delivery Charges</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="free-tag">FREE</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>

              <div className="price-divider"></div>

              <div className="price-line grand-total-line">
                <span>Total Amount</span>
                <span className="total-amount">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Savings & Reward Callout */}
            {estimatedSavings > 0 && (
              <div className="cart-savings-highlight">
                <FiAward className="savings-icon" />
                <div>
                  <strong>You are saving {formatPrice(estimatedSavings)} on this order!</strong>
                  <small>Plus, you earn {rewardCoins} ShopKart Coins on checkout.</small>
                </div>
              </div>
            )}

            <button
              className="btn btn-primary btn-block proceed-btn"
              onClick={handleProceedToDelivery}
            >
              Proceed to Delivery Address <FiArrowRight />
            </button>

            <div className="trust-checkout-notes">
              <div className="checkout-trust-point">
                <FiCheck className="point-icon" />
                <span>Zero convenience fees on all orders</span>
              </div>
              <div className="checkout-trust-point">
                <FiShield className="point-icon" />
                <span>100% Secure 256-bit SSL encrypted checkout</span>
              </div>
              <div className="checkout-trust-point">
                <FiRefreshCw className="point-icon" />
                <span>7-Day Hassle-Free doorstep return guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
