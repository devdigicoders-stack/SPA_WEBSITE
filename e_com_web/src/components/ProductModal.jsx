import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { formatPrice } from "../utils/helpers";
import {
  FiX,
  FiStar,
  FiShoppingCart,
  FiTruck,
  FiShield,
  FiCheckCircle,
  FiPlus,
  FiMinus,
  FiCheck,
} from "react-icons/fi";

const ProductModal = () => {
  const { productDetailModal, setProductDetailModal, addToCart } = useShop();
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!productDetailModal) return null;

  const product = productDetailModal;

  const discountAmount = product.oldPrice ? product.oldPrice - product.price : 0;
  const discountPercent = product.oldPrice
    ? Math.round((discountAmount / product.oldPrice) * 100)
    : 0;

  const handleAdd = () => {
    addToCart(product.id, qty);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setProductDetailModal(null);
    }, 800);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={() => setProductDetailModal(null)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="product-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={() => setProductDetailModal(null)}
          aria-label="Close modal"
        >
          <FiX />
        </button>

        <div className="product-modal-grid">
          {/* Left Column: Image */}
          <div className="modal-image-col">
            <img
              src={product.image}
              alt={product.name}
              className="modal-main-img"
            />
            {product.badge && (
              <span className="modal-badge-pill">{product.badge}</span>
            )}
          </div>

          {/* Right Column: Info */}
          <div className="modal-info-col">
            <span className="modal-category">{product.category}</span>
            <h2 className="modal-title">{product.name}</h2>

            <div className="modal-rating-row">
              <div className="rating-pill">
                <FiStar className="star-icon filled" />
                <span className="bold">{product.rating}</span>
              </div>
              <span className="reviews-count">
                Based on {product.reviews} verified buyer reviews
              </span>
            </div>

            <div className="modal-price-box">
              <span className="modal-current-price">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="modal-old-price">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span className="modal-save-pill">
                    Save {discountPercent}% ({formatPrice(discountAmount)})
                  </span>
                </>
              )}
            </div>

            <p className="modal-description">{product.description}</p>

            {/* Features list */}
            {product.features && (
              <div className="modal-features-wrap">
                <h4 className="features-heading">Key Highlights:</h4>
                <ul className="features-list">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <FiCheckCircle className="feature-check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector & Action */}
            <div className="modal-actions-area">
              <div className="quantity-control-group">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>
                <span className="qty-number">{qty}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQty((prev) => prev + 1)}
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>

              <button
                type="button"
                className={`modal-add-btn ${isAdded ? "btn-success" : ""}`}
                onClick={handleAdd}
              >
                {isAdded ? (
                  <>
                    <FiCheck /> Added to Cart!
                  </>
                ) : (
                  <>
                    <FiShoppingCart /> Add {qty} to Cart • {formatPrice(product.price * qty)}
                  </>
                )}
              </button>
            </div>

            {/* Micro Guarantees */}
            <div className="modal-trust-footer">
              <div className="trust-pill">
                <FiTruck className="trust-icon" />
                <span>Fast 3-Day Delivery</span>
              </div>
              <div className="trust-pill">
                <FiShield className="trust-icon" />
                <span>1-Year Official Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
