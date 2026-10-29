import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { formatPrice } from "../utils/helpers";
import {
  FiShoppingCart,
  FiEye,
  FiStar,
  FiCheck,
  FiPackage,
} from "react-icons/fi";

const ProductCard = ({ product }) => {
  const { addToCart, setProductDetailModal } = useShop();
  const [isAdding, setIsAdding] = useState(false);

  const discountPercentage = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  const handleAdd = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product.id, 1);
    setTimeout(() => {
      setIsAdding(false);
    }, 700);
  };

  return (
    <article className="product-card" onClick={() => setProductDetailModal(product)}>
      {/* Thumbnail & Badges */}
      <div className="product-card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />
        {product.badge && (
          <span className="product-card-badge">{product.badge}</span>
        )}
        {discountPercentage > 0 && (
          <span className="product-discount-tag">-{discountPercentage}%</span>
        )}

        {/* Hover Quick Actions */}
        <div className="card-hover-actions">
          <button
            className="quick-view-btn"
            title="Quick View Details"
            onClick={(e) => {
              e.stopPropagation();
              setProductDetailModal(product);
            }}
          >
            <FiEye /> Quick View
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-card-category">{product.category}</span>
          <div className="product-card-rating">
            <FiStar className="star-icon" />
            <span className="rating-score">{product.rating}</span>
            <span className="rating-count">({product.reviews})</span>
          </div>
        </div>

        <h3 className="product-card-title" title={product.name}>
          {product.name}
        </h3>

        <p className="product-card-desc">{product.description}</p>

        {/* Price & Add to Cart button */}
        <div className="product-card-footer">
          <div className="product-price-block">
            <span className="product-current-price">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="product-old-price">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            className={`card-add-cart-btn ${isAdding ? "added" : ""}`}
            onClick={handleAdd}
            title={`Add ${product.name} to cart`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdding ? (
              <>
                <FiCheck className="btn-icon" /> Added
              </>
            ) : (
              <>
                <FiShoppingCart className="btn-icon" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
